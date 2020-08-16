# 03 Face Recognition - I

## URL: [https://master.d165apizgrkyke.amplifyapp.com/](https://master.d165apizgrkyke.amplifyapp.com/)

## Demo

![demo](demo.gif)

---

## How does it work ?

It uses `dlib`'s library to detect 68 points on the face, this will help us align the face, since the face in the image might be skewed or not facing directly in front.

Once that is done we will create a mask for each of the faces, i.e. by creating a convex hull out of the detected 68 points, now we will create delaunay traingles, so we can simply swap these triangles between the faces, or apply the triangles from one face to the other !

Notebook:  https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/03-FaceRecognition-I/FaceSwap.ipynb

## Code

- [thetensorclan-aws](thetensorclan-aws/)
  - contains the entire code that can be deployed, this will host the server than can serve for image-classification as well as face swap, the only downside is that AWS Lambda has 500MB storage limit, which doesn't allow to do this, nevertheless it can be deployed on a dedicated server
- [thetensorclan-classify](thetensorclan-classify/)
  - contains the code that was deployed on Lambda for the classifier models
- [thetensorclan-face](thetensorclan-face/)
  - contains the code for the face alignment and face swap flask server that was deployed on Lambda

---

## NOTES

- I had to separate out the face and classify backend servers, since both at one single lambda wasn't possible
- **AWS Amplify** is damn cool !, all i did was push my React code to GitHub and it automatically picks up everything and deploys the website !
- Since the PyTorch version updated, i had to setup the whole pipeline again, beginning from updating PyTorch to 1.6.0, but AWS Lambda has storage limit of 500MB, so on Lambda we still use PyTorch 1.5.1 and TorchVision 0.6.0
