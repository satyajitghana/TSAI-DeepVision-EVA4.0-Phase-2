from __future__ import absolute_import
from typing import Set
import io, base64
from PIL import Image
from werkzeug.datastructures import FileStorage

from utils import setup_logger

ALLOWED_EXTENSIONS: Set[str] = {'png', 'jpg', 'jpeg'}

logger = setup_logger(__name__)


def allowed_file(filename: str) -> bool:
    """

    Args:
        filename: the filename

    Returns:
        (bool): whether the file extension is permitted
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def file2image(file: FileStorage) -> Image.Image:
    logger.info(f'Got file {file.filename} of {file.mimetype}')
    file.stream.seek(0)
    byte_stream = io.BytesIO(file.read())
    logger.info(f'File Size: {byte_stream.getbuffer().nbytes}')
    file.close()
    image = Image.open(byte_stream)
    image = image.convert('RGB')

    return image
