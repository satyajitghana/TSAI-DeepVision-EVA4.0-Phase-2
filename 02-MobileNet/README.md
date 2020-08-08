
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

**Deployed:** [https://floating-refuge-59093.herokuapp.com/](https://floating-refuge-59093.herokuapp.com/)
Look at bottom of this file for how i deployed to Heroku

Creation of IFO Dataset

Dataset Link: [https://drive.google.com/file/d/1LXbEadbpuvTJVwj5thGrlMjYP9hzt6Wn/view?usp=sharing](https://drive.google.com/file/d/1LXbEadbpuvTJVwj5thGrlMjYP9hzt6Wn/view?usp=sharing)

PreProcess raw dataset: [https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/IFO_preprocess.ipynb](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/IFO_preprocess.ipynb)

DatasetVisualization: [https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/01_IFODataset.ipynb](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/01_IFODataset.ipynb)

Training: [https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/02_Training.ipynb](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/02_Training.ipynb)

Misclassifications: [https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/03_Misclassifications.ipynb](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/03_Misclassifications.ipynb)

### Dataset

```python
class IFODataset(Dataset):
    """ 
 Dataset generator for MobileNetV2 implementation on Identified
 flying objects dataset
 """
    
    class_names = ['Flying_Birds', 'Large_QuadCopters', 'Small_QuadCopters', 'Winged_Drones']

    def __init__(self, root, source_zipfile, transform=None):

        self.root = Path(root) / 'IFO'
        self.root.mkdir(parents=True, exist_ok=True)
        self.source_zipfile = Path(source_zipfile)
        self.transform = transform

        if os.path.isdir(self.root / 'IFOCleaned'):
            print(f"dataset folder/files already exist in {self.root / 'IFOCleaned'}")
        else:
            self.extractall()

        self.images_paths = sorted(list(Path(self.root / 'IFOCleaned').glob('*/*.jpg')))
        self.targets = [self.class_names.index(image_path.parent.name) for image_path in self.images_paths]

        print(f'found {len(self.images_paths)} images in total')
        l = list(dataset.targets)
        images_per_class = dict((dataset.class_names[x],l.count(x)) for x in set(l))
        print(json.dumps(images_per_class, indent=4))

        # split indices to train and test, use stratify to distribute equally
        self.train_idxs, self.test_idxs = train_test_split(np.arange(len(self.images_paths)), test_size=0.3, shuffle=True, stratify=self.targets)
    
    def extractall(self):
        print('Extracting the dataset zip file')
        zipf = ZipFile(self.source_zipfile, 'r')
        zipf.extractall(self.root)

    def split_dataset(self):
        return Subset(self, indices=self.train_idxs), Subset(self, self.test_idxs)
    
    def __len__(self):
        return len(self.images_paths)
    
    def __getitem__(self, index):

        image_path = self.images_paths[index]
        image = Image.open(image_path)
        image = image.convert('RGB')

        target = self.targets[index]
        
        if self.transform:
            image = self.transform(image)

        return image, target
```

The dataset is a simple zip file with the classes in their individual folders, what's interesting is how we transforms the images for training

**Some dataset stats**
```python
{
    "Flying_Birds": 8164,
    "Large_QuadCopters": 4886,
    "Small_QuadCopters": 3612,
    "Winged_Drones": 5531
}
```
```python
"mean = ['0.533459901809692', '0.584880530834198', '0.615305066108704']"
"std  = ['0.172962218523026', '0.167985364794731', '0.184633478522301']"
```

### Transformations

```python
train_transforms = A.Compose([
                                    #   A.VerticalFlip(), not useful, flying objects cannot be flipped vertically
                                      A.HorizontalFlip(),
                                      A.LongestMaxSize(max_size=500),
                                      A.Normalize(mean=self.mean, std=self.std),
                                      A.PadIfNeeded(min_height=500, min_width=500, border_mode=0, always_apply=True, value=self.mean),
                                      A.Resize(height=224, width=224, always_apply=True),
                                      A.Rotate(limit=30, border_mode=0, always_apply=False, value=self.mean),
                                      A.Cutout(num_holes=2, max_h_size=48, max_w_size=48, p=0.9, fill_value=self.mean),
                                      AT.ToTensor()
                                      ])
```

The Series of Transformations are
- `Horizontal Flip`
	- looking at the dataset, we cannot do vertical flip (birds flying upside down ? quadcopters upside down ? doesn't seem right), so we go for horizontal flip
- `LongestMaxSize`
	- this will resize the image such that the longest size (width/height) is 500 pixels
- `Normalize`
	- pretty common, we've already calculated the mean and std of the dataset so we normalize it during training
- `PadIfNeeded`
	- this is the tricky part, the model needs a square image, and the images in our dataset are not squares, so we pad the image such that it becomes a square of `500x500`
- `Resize`
	- MobileNetV2 needs a `224x244` image so we convert it to such
- `Rotate`
	- addtional transformation to just tilt the image by `+-30` degrees to increase the test accuracy
- `CutOut`
	- Cutout regularization is similar to dropout, but works better, as proved in its paper

![enter image description here](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/images/dataset.png?raw=true)
**Dataset**

![enter image description here](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/images/aug_dataset.png?raw=true)
**Augmented Dataset**


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

## Instructions for Streamlit & Deploy to Heroku

Refer to **[ifo-app](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/02-MobileNet/ifo-app)** for source code

Install streamlit

```shell
pip install streamlit
```

Now after wrting app.py simply run `streamlit run app.py`, check if everything works

Cool, Now let's Deploy!

Make sure your requirements.txt uses these version of torch and torchvision, there are for cpu and python3.6 which heroku uses

**requirements.txt**

```text
https://download.pytorch.org/whl/cpu/torch-1.6.0%2Bcpu-cp36-cp36m-linux_x86_64.whl
https://download.pytorch.org/whl/cpu/torchvision-0.7.0%2Bcpu-cp36-cp36m-linux_x86_64.whl
```

You can find pytorch releases here: https://download.pytorch.org/whl/torch_stable.html

now **`Procfile`**

```text
web: sh setup.sh && streamlit run app.py
```

Initialize a empty git repo

```shell
git init
git add .
git commit -m "initial build"
```

Now create a heroku project and push to it !

```shell
heroku create
git push heroku master
```

NOTE: you can also connect your github repo to heroku and it'll build on push to github
