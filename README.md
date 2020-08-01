# TSAI-DeepVision-EVA4.0-Phase-2

This contains the solutions to the assignments given in The School of AI - Extensive Vision AI 4.0 EVA4 Phase2

## Website: [https://satyajitghana.github.io/TSAI-DeepVision-EVA4.0-Phase-2/](https://satyajitghana.github.io/TSAI-DeepVision-EVA4.0-Phase-2/)

1. [Deploy to AWS](01-Deploy-To-AWS/README.md)

    This was the first time i deployed a DL model on AWS, it was quite an experience, i had to setup WSL to work, then PyCharm to work with my windows's anaconda, and then making sure that the WSL anaconda requirements match with windows anaconda. maaaaan why is it so difficult to share conda envs ?

    Also i used flask to deploy it over AWS Lambda. I spent about 6 hours figuring out why my API didn't work, then realised i didn't allow binary media types in the Gateway settings.

    I learnt that debugging in production is really difficult, you have to rely on logs, so from now on, please do proper logging, and always test on local dev env before deploying.

    finally i deployed it on [https://un64uvk2oi.execute-api.ap-south-1.amazonaws.com/dev/]( https://un64uvk2oi.execute-api.ap-south-1.amazonaws.com/dev/)

2. [MobileNet - Training Custom IFO Dataset](02-MobileNet/index.html)

    Here we created our custom Identified-Flying-Objects dataset, preprocessed it, and trained a MobileNet Model, then deployed it into AWS
