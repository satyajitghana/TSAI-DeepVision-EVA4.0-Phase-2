from __future__ import absolute_import
from .classifiers import *

from functools import partial
import json, os, io
from pathlib import Path
import boto3

import torch

from utils import setup_logger

logger = setup_logger(__name__)


MODEL_REGISTER = {
    'resnet34-imagenet': {
        'model_file': 'mobilenetv2_imagenet',
        'class_file': 'imagenet_classes',
        'classifier_func': classify_resnet34_imagenet
    },
    'mobilenetv2-ifo': {
        'model_file': 'mobilenetv2_ifo.traced',
        'class_file': 'ifo_classes',
        'classifier_func': classify_mobilenetv2_ifo
    }
}


def get_classifier(model_name):
    model_files = MODEL_REGISTER[model_name]

    classes_list = json.load(open(Path('models') / (model_files['class_file'] + '.json')))

    if 'PRODUCTION' in os.environ:
        logger.info(f"=> Loading {model_files['model_file']} from S3")
        s3: BaseClient = boto3.client('s3')
        obj = s3.get_object(Bucket=os.environ['S3_BUCKET'], Key=(model_files['model_file']+'.pt'))
        bytestream = io.BytesIO(obj['Body'].read())
        model = torch.jit.load(bytestream)
    else:
        logger.info(f"=> Loading {model_files['model_file']} from Local")
        model = torch.jit.load(str((Path('models') / (model_files['model_file'] + '.pt'))))
    classifier = model_files['classifier_func']

    return partial(classifier, model, classes_list)
