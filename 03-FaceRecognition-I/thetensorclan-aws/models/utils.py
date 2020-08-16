from __future__ import absolute_import
from .classifiers import *

from functools import partial
import json, os
from pathlib import Path

import torch


MODEL_REGISTER = {
    'resnet34-imagenet': {
        'model_file': 'resnet34_imagenet',
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
    BASE_MODEL_FOLDER = '/tmp' if 'PRODUCTION' in os.environ else 'models'

    classes_list = json.load(open(Path('models') / (model_files['class_file'] + '.json')))
    model = torch.jit.load(str((Path(BASE_MODEL_FOLDER) / (model_files['model_file'] + '.pt'))))
    classifier = model_files['classifier_func']

    return partial(classifier, model, classes_list)
