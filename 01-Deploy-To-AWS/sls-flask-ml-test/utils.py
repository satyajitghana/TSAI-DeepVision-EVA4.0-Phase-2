from PIL import Image
from torch import Tensor
from torchvision.transforms import Compose
import torchvision.transforms as T


def transform_image(image: Image.Image) -> Tensor:
    try:
        trans: Compose = T.Compose([
            T.Resize(255),
            T.CenterCrop(224),
            T.ToTensor(),
            T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

        return trans(image).unsqueeze(0)

    except Exception as e:
        print(repr(e))
        raise e
