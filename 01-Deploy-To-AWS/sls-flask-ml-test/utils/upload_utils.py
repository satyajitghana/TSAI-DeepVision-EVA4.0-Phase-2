from typing import Set

ALLOWED_EXTENSIONS: Set[str] = {'png', 'jpg', 'jpeg'}


def allowed_file(filename: str) -> bool:
    """

    Args:
        filename: the filename

    Returns:
        (bool): whether the file extension is permitted
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

