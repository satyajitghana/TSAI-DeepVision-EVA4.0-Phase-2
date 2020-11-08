# TSAI-DeepVision-EVA4.0-Phase-2

This contains the solutions to the assignments given in The School of AI - Extensive Vision AI 4.0 EVA4 Phase2

## Website: [https://satyajitghana.github.io/TSAI-DeepVision-EVA4.0-Phase-2/](https://satyajitghana.github.io/TSAI-DeepVision-EVA4.0-Phase-2/)

`[prefer to use the website]`

1. [Deploy to AWS](01-Deploy-To-AWS/README.md)

    This was the first time i deployed a DL model on AWS, it was quite an experience, i had to setup WSL to work, then PyCharm to work with my windows's anaconda, and then making sure that the WSL anaconda requirements match with windows anaconda. maaaaan why is it so difficult to share conda envs ?

    Also i used flask to deploy it over AWS Lambda. I spent about 6 hours figuring out why my API didn't work, then realised i didn't allow binary media types in the Gateway settings.

    I learnt that debugging in production is really difficult, you have to rely on logs, so from now on, please do proper logging, and always test on local dev env before deploying.

    finally i deployed it on [https://un64uvk2oi.execute-api.ap-south-1.amazonaws.com/dev/](https://un64uvk2oi.execute-api.ap-south-1.amazonaws.com/dev/)

2. [MobileNet - Training Custom IFO Dataset](02-MobileNet/index.html)

    Here we created our custom Identified-Flying-Objects dataset, preprocessed it, and trained a MobileNet Model, then deployed it into AWS.

    Also i made a streamlit app and deployed it to heroku ! [https://floating-refuge-59093.herokuapp.com/](https://floating-refuge-59093.herokuapp.com/)

3. [FaceRecognition-I - Implementing Face Swap !](03-FaceRecognition-I/)

    Face Recognition starts by aligning your face so it looks directly to the front. Here we implemented FaceSwap by aligning the two faces and then swapping the detected face. The face was detected using the dlib's 68 point frontal face detector.

    The Flask Backend was deployed on AWS Lambda and the React Frontend on AWS Amplify
    [https://master.d165apizgrkyke.amplifyapp.com/](https://master.d165apizgrkyke.amplifyapp.com/)

4. [FaceRecognition-II - Deploying Face Recognizer Model !](04-FaceRecognition-II/index.html)

    Here i finally trained a Face Recognizer model and deployed it over Heroku ! why Heroku you ask ? head over to its README. All the models are hosted on a single dyno instance now. Face Align and Swap are still hosted on Lambda.

    My Amazon S3 Limits have shot up, so i don't want to risk incurring costs, Face Swap doesn't use S3 so thats ok.

    The Flask Backend was moved to Heroku, as well as the Front end is now hosted on Heroku
    [https://thetensorclan-web.herokuapp.com/](https://thetensorclan-web.herokuapp.com/)

5. [HumanPoseEstimation-ONNX](05-HumanPoseEstimation-ONNX/README.md)

    Following the usual drill, here i learnt about Human Pose Estimation, and we deployed a pretrained model, and it was added to the backend and the frontend.

    Something to note that i hit the storage limits, so i had to resort to converting the large 170MB model to ONNX and then quantizing it to 68MB, so that saved a lot of computatation costs and storage.

    I wrote a blog on it [https://satyajitghana.github.io/2020/08/pose-estimation-onnx.html](https://satyajitghana.github.io/2020/08/pose-estimation-onnx.html)

    Also deployment url: [https://thetensorclan-web.herokuapp.com/](https://thetensorclan-web.herokuapp.com/)

6. [Generative Adversarial Networks](06-GenerativeAdversarialNetworks/README.md)

    Here i learnt about GAN's and what the actual awesome stuff this is ! it allows me to train a model on a dataset and actually create a new dataset which is very similar to the source dataset !

    Deployment url: [https://thetensorclan-web.herokuapp.com/red-car-gan](https://thetensorclan-web.herokuapp.com/red-car-gan)

7. [Variational AutoEncoders](07-VariationalAutoEncoders/README.md)

    The previous assignment was done using VAE.

    Deployment url: [https://thetensorclan-web.herokuapp.com/red-car-vae](https://thetensorclan-web.herokuapp.com/red-car-vae)

    Also a nice little thing i did with MNIST VAE and ONNX.JS : [https://thetensorclan-web.herokuapp.com/mnist-vae](https://thetensorclan-web.herokuapp.com/mnist-vae), this model directly runs on your browser ! and on real time !, simply draw a digit on the canvas, and the model will try to reconstruct it

8. [SuperResolution & StyleTransfer](08-SuperResolution_StyleTransfer/README.md)

    The dataset used in MobileNetV2 assignment was used to create a Super Resolution model or SRGAN, the images sent to the model are upscaled by a factor
    of 2.

    Also Neural Style Transfer models were deployed, i used fast neural style transfer which are basically feed forward network that are pretrained to apply a specific style to a image.

    ST Deployment url: [https://thetensorclan-web.herokuapp.com/style-transfer](https://thetensorclan-web.herokuapp.com/style-transfer)
    
    SR Deployment url: [http://thetensorclan-web.herokuapp.com/ifo-sr](http://thetensorclan-web.herokuapp.com/ifo-sr)

9. [Neural Word Embedding](09-NeuralWordEmbedding/README.md)

    This was a pretty straight forward deployemnt for a NLP Model, i learnt quite a lot of things about NLP, and how embeddings work, what's the purpose of embedding.

    Also a thing to note that i wasn't able to use a traced model on the backend, so i had to use a scripted model

    Spacy Model overloaded the backend, so i had to use a small model, and also always load the model inside the function, never store a copy of the model as global variable.

    Deployment url: [https://thetensorclan-web.herokuapp.com/text-classifiers](https://thetensorclan-web.herokuapp.com/text-classifiers)

10. [Attention & Transformers](11-11-Attention&Transformers/README.md)

    NLP is vastly affected by transformers ! even the huge GPT-3 uses transformer, this assignment was the very basics, where we created a simple German to English Translator using Attention and Transformers.

    Deployment url: [https://thetensorclan-web.herokuapp.com/translator](https://thetensorclan-web.herokuapp.com/translator)
