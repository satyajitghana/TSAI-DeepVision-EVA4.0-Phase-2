from typing import Dict

import pickle

# load the pickled file that contained the dict of idx2class
imagenet_classes: Dict = pickle.load(open('utils/imagenet_classes.pkl', 'rb'))


def idx2label(idx: int) -> str:
    """
    Converts ImageNet class index to Class Name
    Args:
        idx:

    Returns:

    """
    return imagenet_classes[idx]
