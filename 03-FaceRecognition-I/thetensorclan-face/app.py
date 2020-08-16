
from __future__ import absolute_import
import base64

from werkzeug.datastructures import FileStorage

from face import align_face, swap_faces
from utils import setup_logger, allowed_file, download_face_files, file2image, image2b64

import sys
import os
import io
import json

from flask import Flask, jsonify, request, Response, make_response, send_file
from flask_cors import CORS, cross_origin
from PIL import Image, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

logger = setup_logger(__name__)
logger.info('Finished Importing')

logger.info('Downloading Necessary Files')
download_face_files()

# attach our logger to the system exceptions
sys.excepthook = lambda type, val, tb: logger.error("Unhandled exception:", exc_info=val)

app = Flask(__name__)
cors = CORS(app=app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/")
@cross_origin()
def hello_thetensorclan():
    return jsonify({'message': 'You\'ve reached the TensorClan FACE EndPoint'}), 200


@app.route("/face-align", methods=["POST"])
@cross_origin()
def face_align_api():
    if 'file' not in request.files:
        return Response({'error': 'No file part'}, status=412)

    file: FileStorage = request.files['file']

    if file.filename == '':
        return Response({'error': 'No file selected'}, status=417)

    if allowed_file(file.filename):
        image = file2image(file)

        logger.info(f'Running Align Face on {file.filename}')

        # align the face
        aligned_face = align_face(image)

        # convert it to bytes
        b64_image = image2b64(aligned_face)

        return jsonify(b64_image), 200

    else:
        return Response({'error': f'{file.mimetype} not allowed'}, status=412)


@app.route("/face-swap", methods=["POST"])
@cross_origin()
def face_swap_api():

    if 'files' not in request.files:
        return Response({'error': 'No files selected'}, status=412)

    files = request.files.getlist('files')

    if len(files) != 2:
        return Response({'error': 'Select Two Faces (Images)'}, status=412)

    face_one = files[0]
    face_two = files[1]

    if allowed_file(face_one.filename) and allowed_file(face_two.filename):
        f1_image = file2image(face_one)
        f2_image = file2image(face_two)

        logger.info(f'Running FaceSwap')
        swapped_face = swap_faces(f1_image, f2_image)

        # convert it to bytes
        b64_image = image2b64(swapped_face)

        return jsonify(b64_image), 200

    else:
        return Response({'error': f'{face_one.mimetype} not allowed'}, status=412)
