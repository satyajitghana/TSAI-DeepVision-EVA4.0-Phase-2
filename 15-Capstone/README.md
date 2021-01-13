# Capstone Project

Develop a lobe.ai clone:
    1. allow people to upload their own data:
        a. Images (10x2 - 80:20) upto (100*10 - 70-30)
        b. text samples (csv files) (min 100 - max 1000)*2-3 - 70:30)
    2. plug-in a model of your choice
    3. train the model on AWS EC2, use lambda to preprocess, trigger EC2 and match user id with the files stored on EC2, and for inferencing (as discussed in the class, refer the video below)
    4. move the model to lambda and show inferencing

Points to be noted:

    1. If you are doing object detection, you need to build a front-end for annotation, and then you do not need to do 1.b.
    2. you need to trigger the AWS training using lambda, so it is not always on
    3. try and pre-process the data on lambda or in browser to make sure you are not uploading BIG data
    4. limit max images per class to 100 and max classes to 10
    5. use transfer learning

For annotation, you can use: <https://www.robots.ox.ac.uk/~vgg/software/via/> (Links to an external site.)

Submission Points:

10000 points
If you submit this, and this clears the expectations, non-submission of any other assignment will not cause any other issue. However, if you are not able to submit this assignment properly then all other assignments will be considered. 
Additional points for any other thing you implement end to end (apart from a beautiful UI, which is recommended, but not enforced, focus more on UX).

## Solution

Github: <https://github.com/ProjektTejas>
Website: <https://tejas.tensorclan.tech/>
Documentation (Must Read): <https://projekt-tejas-docs.vercel.app/>
