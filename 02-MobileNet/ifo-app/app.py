from __future__ import absolute_import

from io import BytesIO
from typing import Dict

from PIL import Image

from utils import classify

import streamlit as st
import torch

import pandas as pd
from google_drive_downloader import GoogleDriveDownloader as gdd

# download the model
gdd.download_file_from_google_drive(file_id='1KPuETrEQSAdIVpvFYz1-cf3Xji5zj8b6', dest_path='./ifo_model.pt', unzip=False)

# setup the model
model = torch.load('ifo_model.pt')

st.set_option('deprecation.showfileUploaderEncoding', False)

st.title("Identified Flying Object Classifier")

st.markdown('Implementation of [TSAI-EVA4-P2-MobileNet](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/tree/master/02-MobileNet)')

file: BytesIO = st.file_uploader("Upload an image file", type=["jpg", "png"])

if file:
    predicted: str
    probabilities: Dict[str, float]
    predicted, probabilities = classify(model, file)

    st.image(Image.open(file), use_column_width=True)
    st.markdown(f"## I've identified it as a {predicted}")

    st.markdown('## Class Confidences')
    st.write(pd.Series(probabilities))
else:
    st.markdown("**Please upload a file first**")

