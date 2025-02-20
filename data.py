'''
Data handling for the project.
'''

import os
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import tensorflow_datasets as tfds

def load_data(dataset_name: str):
    dataset = tfds.load(dataset_name)
    print(dataset)
    return dataset['train']

def split_data(dataset: tf.data.Dataset):
    train_size = int(dataset.cardinality().numpy() * 0.8)
    test_size = dataset.cardinality().numpy() - train_size
    return dataset.take(train_size), dataset.skip(train_size)

def get_batch(dataset: tf.data.Dataset, batch_size: int):
    return dataset.batch(batch_size)

def view_batch(batch: tf.data.Dataset):
    for image, label in batch:
        batch_size = image.shape[0]
        for i in range(batch_size):
            plt.figure()
            plt.imshow(image[i])
            plt.title(label[i])
            plt.show()

def resize_images(sample: dict):
    image = sample['image']
    image = tf.image.resize(image, [160, 160])
    return image, sample['label']

def preprocess_data(dataset: tf.data.Dataset):
    dataset = dataset.map(lambda x, y: (tf.image.resize(x, [160, 160]), y))
    return dataset

def normalize_data(dataset: tf.data.Dataset):
    dataset = dataset.map(lambda x, y: (x / 255.0, y))
    return dataset

def augment_data(dataset: tf.data.Dataset):
    dataset = dataset.map(lambda x, y: (tf.image.random_flip_left_right(x), y))
    return dataset

def cache_data(dataset: tf.data.Dataset):
    dataset = dataset.cache()
    return dataset

def shuffle_data(dataset: tf.data.Dataset):
    dataset = dataset.shuffle(buffer_size=1024)
    return dataset

def prefetch_data(dataset: tf.data.Dataset):
    dataset = dataset.prefetch(buffer_size=tf.data.AUTOTUNE)
    return dataset

if __name__ == '__main__':
    dataset = load_data('cats_vs_dogs')

    # View a batch of data
    batch_size = 32
    train_dataset, test_dataset = split_data(dataset)
    train_dataset = train_dataset.map(resize_images)
    train_batch = get_batch(train_dataset, batch_size)
    view_batch(train_batch)
