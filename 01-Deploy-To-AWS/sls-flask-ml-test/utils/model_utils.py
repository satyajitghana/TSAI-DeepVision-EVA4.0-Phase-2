import torchvision.transforms as T
from PIL import Image
from torch import Tensor
from torch.jit import RecursiveScriptModule
from torchvision.transforms import Compose

from .logger import setup_logger

logger = setup_logger(__name__)


def transform_image(image: Image.Image) -> Tensor:
    """
    Transforms the given image to the required type
    Args:
        image (PIL.Image.Image): the input image
    Returns:
        (Tensor): the transformed image
    """
    try:
        trans: Compose = T.Compose([
            T.Resize(256),
            T.CenterCrop(224),
            T.ToTensor(),
            T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

        return trans(image).unsqueeze(0)

    except Exception as e:
        print(repr(e))
        raise e


def classify_image(model: RecursiveScriptModule, image: Image.Image) -> int:
    """
    performs classification by running the image on the model
    Args:
        model (RecursiveScriptModule): the input model in jit format
        image (PIL.Image.Image): the input image
    Returns:
         (int): class_idx
    """
    logger.info('Resizing Image')
    img_tensor: Tensor = transform_image(image)

    logger.info('Running Image on Model')
    return model(img_tensor).argmax().item()
