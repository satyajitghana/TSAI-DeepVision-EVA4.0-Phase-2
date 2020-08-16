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
    models = ['mobilenetv2_ifo.traced.pt', 'mobilenetv2_imagenet.pt']
    for model in models:
        model_path = f'/tmp/{model}'
        if not os.path.exists(model_path):
            logger.info(f'=> Downloading {model} from S3 Bucket')
            s3.download_file(os.environ['S3_BUCKET'], model, model_path)
