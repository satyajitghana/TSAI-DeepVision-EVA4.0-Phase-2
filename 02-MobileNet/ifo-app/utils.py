from io import BytesIO
from typing import List, Tuple, Dict

from torch import Tensor
import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.transforms as T

from PIL import Image
from torchvision.transforms import Compose

MEAN: List = [0.533459901809692, 0.584880530834198, 0.615305066108704]
STD: List = [0.172962218523026, 0.167985364794731, 0.184633478522301]
CLASS_NAMES = ['Flying_Birds', 'Large_QuadCopters', 'Small_QuadCopters', 'Winged_Drones']

TRANSFORMS: Compose = T.Compose([
    T.Resize((224, 224)),
    T.ToTensor(),
    T.Normalize(mean=MEAN, std=STD),
])


def classify(model: nn.Module, image: BytesIO) -> Tuple[str, Dict[str, float]]:
    img: Image = Image.open(image).convert('RGB')
    img: Tensor = TRANSFORMS(img)
    img.unsqueeze_(0)

    model.eval()
    with torch.no_grad():
        outputs: Tensor = model(img)
        probs: Tensor = F.softmax(outputs, dim=-1).squeeze(0)
        max_idx = probs.argmax(dim=-1)

    max_idx = max_idx.cpu().numpy()
    probs = probs.cpu().numpy().tolist()

    return CLASS_NAMES[max_idx], {CLASS_NAMES[idx]: v for idx, v in enumerate(probs)}
