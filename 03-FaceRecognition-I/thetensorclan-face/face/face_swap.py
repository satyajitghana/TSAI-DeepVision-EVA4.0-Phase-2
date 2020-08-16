from __future__ import absolute_import

from .face_blend_common import *
from .face_align import get_landmarks

from PIL import Image
import cv2
import numpy as np


def swap_faces(face1: Image.Image, face2: Image.Image):
    face1 = cv2.cvtColor(np.array(face1), cv2.COLOR_RGB2BGR)
    face2 = cv2.cvtColor(np.array(face2), cv2.COLOR_RGB2BGR)

    face1_warped = np.copy(face2)

    points1, points2 = get_landmarks(face1), get_landmarks(face2)

    # generate the convex hull
    hull_index = cv2.convexHull(np.array(points2), returnPoints=False)

    # create convex hull lists
    hull1, hull2 = [], []
    for i in range(0, len(hull_index)):
        hull1.append(points1[hull_index[i][0]])
        hull2.append(points2[hull_index[i][0]])

    # calculate Mask for seamless cloning
    hull8U = []
    for i in range(0, len(hull2)):
        hull8U.append((hull2[i][0], hull2[i][1]))

    mask = np.zeros_like(face2)
    cv2.fillConvexPoly(mask, np.int32(hull8U), (255, 255, 255))

    # Find Centroid
    m = cv2.moments(mask[:, :, 1])
    center = (int(m['m10']/m['m00']), int(m['m01']/m['m00']))

    # Find Delaunay traingulation for convex hull points
    size_face2 = face2.shape
    rect = (0, 0, size_face2[1], size_face2[0])

    dt = calculateDelaunayTriangles(rect, hull2)
    imTemp1 = face1.copy()
    imTemp2 = face2.copy()

    tris1 = []
    tris2 = []
    for i in range(0, len(dt)):
        tri1 = []
        tri2 = []
        for j in range(0, 3):
            tri1.append(hull1[dt[i][j]])
            tri2.append(hull2[dt[i][j]])

        tris1.append(tri1)
        tris2.append(tri2)

    # Simple Alpha Blending
    # Apply affine transformation to Delaunay triangles
    for i in range(0, len(tris1)):
        warpTriangle(face1, face1_warped, tris1[i], tris2[i])

    # Clone seamlessly.
    output = cv2.seamlessClone(np.uint8(face1_warped), face2, mask, center, cv2.NORMAL_CLONE)

    swapped_face = Image.fromarray(cv2.cvtColor(output, cv2.COLOR_BGR2RGB))

    return swapped_face
