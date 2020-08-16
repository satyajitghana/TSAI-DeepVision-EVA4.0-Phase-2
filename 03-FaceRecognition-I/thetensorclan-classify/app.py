import base64

from werkzeug.datastructures import FileStorage

from models import get_classifier
from utils import setup_logger, allowed_file, file2image
from models.utils import MODEL_REGISTER

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

# attach our logger to the system exceptions
sys.excepthook = lambda type, val, tb: logger.error("Unhandled exception:", exc_info=val)

app = Flask(__name__)
cors = CORS(app=app)
app.config['CORS_HEADERS'] = 'Content-Type'

if 'PRODUCTION' not in os.environ:
    logger.info('Models should be in models folder in local run')
    app.config['DEBUG'] = True


@app.route("/")
@cross_origin()
def hello_thetensorclan():
    return jsonify({'message': 'You\'ve reached the TensorClan Classify EndPoint'}), 200


@app.route("/classify/<model_handle>", methods=['POST'])
@cross_origin()
def classify_image_api(model_handle='resnet34-imagenet'):
    if model_handle not in MODEL_REGISTER:
        return Response({'error': f'{model_handle} not found in registered models'}, status=404)

    if 'file' not in request.files:
        return Response({'error': 'No file part'}, status=412)

    file: FileStorage = request.files['file']

    if file.filename == '':
        return Response({'error': 'No file selected'}, status=417)

    if allowed_file(file.filename):
        image = file2image(file)
        classifier = get_classifier(model_handle)
        output = classifier(image)
        return Response(json.dumps(output), status=200)

    else:
        return Response({'error': f'{file.mimetype} not allowed'}, status=412)
