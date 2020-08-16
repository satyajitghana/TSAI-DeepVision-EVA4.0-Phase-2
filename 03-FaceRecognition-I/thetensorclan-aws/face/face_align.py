from __future__ import absolute_import

from .face_blend_common import *

from PIL import Image
import cv2
import numpy as np
import dlib
import os


def get_landmarks(image):
    face_detector = dlib.get_frontal_face_detector()
    BASE_FOLDER = '/tmp' if 'PRODUCTION' in os.environ else 'face'
    landmark_detector = dlib.shape_predictor(f'{BASE_FOLDER}/shape_predictor_68_face_landmarks.dat')
    points = getLandmarks(face_detector, landmark_detector, image)
    return points


def align_face(image: Image.Image):
    image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    points = get_landmarks(image)
    imnorm, points = normalizeImagesAndLandmarks((600, 600), image, np.array(points))

    aligned_image = Image.fromarray(cv2.cvtColor(imnorm, cv2.COLOR_BGR2RGB))

    return aligned_image
