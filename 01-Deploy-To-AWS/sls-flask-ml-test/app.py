from logging import Logger
from typing import Any

import boto3
import os
import io
import sys

from werkzeug.datastructures import FileStorage

try:
    import unzip_requirements
except ImportError:
    pass

from flask import Flask, request, Response, render_template, jsonify
from flask_cors import CORS, cross_origin
from torch.jit import RecursiveScriptModule
import torch
from botocore.client import BaseClient
from PIL import Image, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

from utils import idx2label, setup_logger, classify_image, allowed_file

logger: Logger = setup_logger(__name__)

logger.info('Finished Importing')

# attach our logger to the system exceptions
sys.excepthook = lambda type, val, tb: logger.error("Unhandled exception:", exc_info=val)

logger.info('Setting up Flask')
app: Flask = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

if 'PRODUCTION' in os.environ:
    # BUCKET VARIABLES
    S3_BUCKET: str = os.environ['S3_BUCKET']
    MODEL_PATH: str = os.environ['MODEL_PATH']

    logger.info(f'Downloading the Model from S3 {S3_BUCKET}/{MODEL_PATH}')
    s3: BaseClient = boto3.client('s3')

    # get the model
    if not os.path.isfile(MODEL_PATH):
        obj: Any = s3.get_object(Bucket=S3_BUCKET, Key=MODEL_PATH)
        bytestream: io.BytesIO = io.BytesIO(obj['Body'].read())
        logger.info('Loading Model ...')
        model: RecursiveScriptModule = torch.jit.load(bytestream)
        logger.info('Model Loaded !')

    app.config["DEBUG"] = True

# local development environment
else:
    logger.info('Loading Model ...')
    model: RecursiveScriptModule = torch.jit.load("models/mobilenetv2.pt")
    logger.info('Model Loaded !')
    app.config["DEBUG"] = True


@app.route("/")
def hello_thetensorclan() -> Response:
    return render_template('index.html')


@app.route('/classify', methods=['GET', 'POST'])
@cross_origin()
def upload_file() -> Response:
    if request.method == 'POST':

        # check if the post request has the file part
        if 'file' not in request.files:
            return Response({'error': 'No file part'}, status=412)

        file: FileStorage = request.files['file']

        # print(file.read().decode('UTF-8'))

        # check if the filename is empty
        if file.filename == '':
            return Response({'error': 'No file selected'}, status=417)

        # check if the filetype is allowed
        if file and allowed_file(file.filename):
            logger.info(f'Got file {file.filename} of {file.mimetype}')
            # logger.info(f'Saving file')
            # file.save(os.path.join(UPLOAD_FOLDER, file.filename))
            # image = Image.open(os.path.join(UPLOAD_FOLDER, file.filename))
            file.stream.seek(0)
            byte_stream = io.BytesIO(file.read())
            logger.info(f'File Size: {byte_stream.getbuffer().nbytes}')
            file.close()
            image = Image.open(byte_stream)
            # image: Image.Image = Image.open(io.BytesIO(file.read()))
            # image: Image.Image = Image.open(file.stream)
            logger.info(f'Running classify_image')
            prediction = classify_image(model, image)

            return jsonify({
                'id': prediction,
                'class_name': idx2label(prediction)
            })

    return render_template('upload.html')


if 'PRODUCTION' not in os.environ:
    app.run()
