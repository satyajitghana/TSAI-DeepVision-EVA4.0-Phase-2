import torchvision.transforms as T
from torchvision.transforms import Compose
import torch.nn.functional as F

from utils import setup_logger

logger = setup_logger(__name__)


def classify_resnet34_imagenet(model, classes, image):
    trans: Compose = T.Compose([
        T.Resize(256),
        T.CenterCrop(224),
        T.ToTensor(),
        T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    img_tensor = trans(image).unsqueeze(0)
    predicted = model(img_tensor).squeeze(0)
    predicted = F.softmax(predicted)
    sorted_values = predicted.argsort(descending=True).cpu().numpy()

    top10pred = list(map(lambda x: {'class_idx': x.item(),'class_name': classes[x], 'confidence': predicted[x].item()}, sorted_values))[:10]

    return top10pred


def classify_mobilenetv2_ifo(model, classes, image):
    trans: Compose = T.Compose([
        T.Resize(256),
        T.CenterCrop(224),
        T.ToTensor(),
        T.Normalize(mean=[0.533459901809692, 0.584880530834198, 0.615305066108704], std=[0.172962218523026, 0.167985364794731, 0.184633478522301])
    ])

    img_tensor = trans(image).unsqueeze(0)
    predicted = model(img_tensor).squeeze(0)
    predicted = F.softmax(predicted)
    sorted_values = predicted.argsort(descending=True).cpu().numpy()

    logger.info(sorted_values)

    top4pred = list(map(lambda x: {'class_idx': x.item(), 'class_name': classes[x], 'confidence': predicted[x].item()}, sorted_values))[:4]

    return top4pred

