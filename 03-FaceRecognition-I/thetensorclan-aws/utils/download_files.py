from __future__ import absolute_import

import os
import bz2
import urllib.request
import boto3
from botocore.client import BaseClient

from utils import setup_logger

logger = setup_logger(__name__)


def download_models():
    s3: BaseClient = boto3.client('s3')
    models = ['mobilenetv2_ifo.traced.pt', 'mobilenetv2_imagenet.pt', 'resnet34_imagenet.pt']
    for model in models:
        model_path = f'/tmp/{model}'
        if not os.path.exists(model_path):
            logger.info(f'=> Downloading {model} from S3 Bucket')
            s3.download_file(os.environ['S3_BUCKET'], model, model_path)


def download_face_files():
    if 'PRODUCTION' not in os.environ:
        shape_predictor_file = "face/shape_predictor_68_face_landmarks.dat"
    else:
        shape_predictor_file = '/tmp/shape_predictor_68_face_landmarks.dat'

    if not os.path.exists(shape_predictor_file):
        logger.info("=> Downloading FaceLandmarks")
        urllib.request.urlretrieve("http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2", f"{shape_predictor_file}.bz2")

        # decompress data
        with bz2.open(f'{shape_predictor_file}.bz2', 'rb') as f:
            uncompressed_content = f.read()

        # write to file
        with open(shape_predictor_file, 'wb') as f:
            f.write(uncompressed_content)
            f.close()
    else:
        logger.info(f'{shape_predictor_file} already downloaded')
