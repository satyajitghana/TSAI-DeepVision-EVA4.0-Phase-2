# 09 Neural Word Embedding

## Tutorials

SOURCE : [https://github.com/bentrevett/pytorch-sentiment-analysis](https://github.com/bentrevett/pytorch-sentiment-analysis)

1 - [Simple Sentiment Analysis](https://github.com/bentrevett/pytorch-sentiment-analysis/blob/master/1%20-%20Simple%20Sentiment%20Analysis.ipynb)

This tutorial covers the workflow of a PyTorch with TorchText project. We'll learn how to: load data, create train/test/validation splits, build a vocabulary, create data iterators, define a model and implement the train/evaluate/test loop. The model will be simple and achieve poor performance, but this will be improved in the subsequent tutorials.

2 - [Upgraded Sentiment Analysis](https://github.com/bentrevett/pytorch-sentiment-analysis/blob/master/2%20-%20Upgraded%20Sentiment%20Analysis.ipynb)

Now we have the basic workflow covered, this tutorial will focus on improving our results. We'll cover: using packed padded sequences, loading and using pre-trained word embeddings, different optimizers, different RNN architectures, bi-directional RNNs, multi-layer (aka deep) RNNs and regularization.

3 - [Faster Sentiment Analysis](https://github.com/bentrevett/pytorch-sentiment-analysis/blob/master/3%20-%20Faster%20Sentiment%20Analysis.ipynb)

After we've covered all the fancy upgrades to RNNs, we'll look at a different approach that does not use RNNs. More specifically, we'll implement the model from Bag of Tricks for Efficient Text Classification (Links to an external site.). This simple model achieves comparable performance as the Upgraded Sentiment Analysis, but trains much faster.

4 - [Convolutional Sentiment Analysis](https://github.com/bentrevett/pytorch-sentiment-analysis/blob/master/4%20-%20Convolutional%20Sentiment%20Analysis.ipynb)

Next, we'll cover convolutional neural networks (CNNs) for sentiment analysis. This model will be an implementation of Convolutional Neural Networks for Sentence Classification (Links to an external site.).

5 - [Multi-class Sentiment Analysis](https://github.com/bentrevett/pytorch-sentiment-analysis/blob/master/5%20-%20Multi-class%20Sentiment%20Analysis.ipynb)

Then we'll cover the case where we have more than 2 classes, as is common in NLP. We'll be using the CNN model from the previous notebook and a new dataset which has 6 classes.

6 - [Transformers for Sentiment Analysis](https://github.com/bentrevett/pytorch-sentiment-analysis/blob/master/6%20-%20Transformers%20for%20Sentiment%20Analysis.ipynb)

Finally, we'll show how to use the transformers library to load a pre-trained transformer model, specifically the BERT model from this (Links to an external site.) paper, and use it to provide the embeddings for text. These embeddings can be fed into any model to predict sentiment, however we use a gated recurrent unit (GRU).

## Assignment

The assignment required to deploy any one of the above models in our backend.

So i trained and saved the model in TorchScript: [https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/09-NeuralWordEmbedding/Multi_class_Sentiment_Analysis_Deployment.ipynb](https://github.com/satyajitghana/TSAI-DeepVision-EVA4.0-Phase-2/blob/master/09-NeuralWordEmbedding/Multi_class_Sentiment_Analysis_Deployment.ipynb)

The model takes in variable length sentences, so we cannot use a traced model, so here i used a script model. The rest of the deployment stuff is same as always.

## Deployment: [https://thetensorclan-web.herokuapp.com/text-classifiers](https://thetensorclan-web.herokuapp.com/text-classifiers)

![demo](demo9.gif)

## UPDATES

* Major update on the website, added animations, transitions
* Added a Layout Loader on reload
* Created a custom made Logo for TTC (The Tensor Clan) on Illustrator and exported to SVG, then made line loading animations on that
