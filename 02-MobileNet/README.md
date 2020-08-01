
# 02. MobileNet

## Assignment

1.  "Each" batch is supposed to collect 1000 images for the classes mentioned above:
    1.  Google Drive Link had been emailed to you (one person in every group, you can add rest) already
    2.  When you search, make sure to add some country names like "Small Quadcopter India". You cannot use these 3 names "USA", "India" and "China". We are trying to avoid downloading the same files.
    3.  In all of these images, the objects MUST be flying and not on the ground (so no product images or them on the ground)
    4.  Don't use Google Images only, use Flickr, Bing, Yahoo, DuckDuckGo
    5.  Do not rename the files, as we'd like to know if the same files are there.
    6.  You need to add 1000 images to the respective folders on Google Drive **before Wednesday Noon**.
2.  Train (transfer learning) MobileNet-V2 on a custom dataset of 31000 images:
    1.  21k train, 10k test, remove duplicated (same names)
    2.  with 4 classes Small 4Copter, Large 4Copter, Winged Drones and Flying Birds
    3.  model is trained on 224x224, images you'll download are not 224x224. Think and implement the best strategy
    4.  Upload the model on Lambda, and keep it ready for future use (use the same S3 bucket).

## Solution

Creation of IFO Dataset

Dataset Link: [https://drive.google.com/file/d/1LXbEadbpuvTJVwj5thGrlMjYP9hzt6Wn/view?usp=sharing](https://drive.google.com/file/d/1LXbEadbpuvTJVwj5thGrlMjYP9hzt6Wn/view?usp=sharing)

PreProcess raw dataset: [https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/IFO_preprocess.ipynb](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/IFO_preprocess.ipynb)

DatasetVisualization: [https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/01_IFODataset.ipynb](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/01_IFODataset.ipynb)

Training: [https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/02_Training.ipynb](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/02_Training.ipynb)

Misclassifications: [https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/03_Misclassifications.ipynb](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/03_Misclassifications.ipynb)

### Dataset

```python
{
    "Flying_Birds": 8164,
    "Large_QuadCopters": 4886,
    "Small_QuadCopters": 3612,
    "Winged_Drones": 5531
}
```
![enter image description here](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/images/dataset.png?raw=true)
Dataset

![enter image description here](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/images/aug_dataset.png?raw=true)
Augmented Dataset


### Training Logs


![enter image description here](https://raw.githubusercontent.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/b84ac8be9a712732d1bbfae0dad919318680db99/02-MobileNet/images/BatchLoss_Train_loss.svg)
BatchLoss-Train


![enter image description here](https://raw.githubusercontent.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/b84ac8be9a712732d1bbfae0dad919318680db99/02-MobileNet/images/EpochLoss_Test_loss.svg)
EpochLoss-Test

![enter image description here](https://raw.githubusercontent.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/b84ac8be9a712732d1bbfae0dad919318680db99/02-MobileNet/images/EpochLoss_Train_loss.svg)
EpochLoss-Train

![enter image description here](https://raw.githubusercontent.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/b84ac8be9a712732d1bbfae0dad919318680db99/02-MobileNet/images/EpochAccuracy_Train_accuracy.svg)
EpochAccuracy-Train

![enter image description here](https://raw.githubusercontent.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/b84ac8be9a712732d1bbfae0dad919318680db99/02-MobileNet/images/EpochAccuracy_Test_accuracy.svg)
EpochAccuracy-Test

### Misclassifications

```python
{
	'Flying_Birds': 18,
	'Large_QuadCopters': 133,
	'Small_QuadCopters': 748,
	'Winged_Drones': 324
 }
```

![enter image description here](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/images/misclassifications.png?raw=true)

**Classification Report**

```text
                   precision    recall  f1-score   support

     Flying_Birds       0.96      0.99      0.98      2449
Large_QuadCopters       0.58      0.91      0.71      1466
Small_QuadCopters       0.84      0.31      0.45      1084
    Winged_Drones       0.94      0.80      0.87      1659

         accuracy                           0.82      6658
        macro avg       0.83      0.75      0.75      6658
     weighted avg       0.85      0.82      0.80      6658

                   Flying_Birds  ...  Winged_Drones
Flying_Birds               2431  ...             12
Large_QuadCopters            29  ...             50
Small_QuadCopters            12  ...             24
Winged_Drones                59  ...           1335

[4 rows x 4 columns]
```

**Confusion Matrix**

![enter image description here](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/images/confusion_matrix.png?raw=true)


