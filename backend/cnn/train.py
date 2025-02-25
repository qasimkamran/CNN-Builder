# cnn/train.py
import tensorflow as tf
import numpy as np
import os

from .model import build_custom_model, get_default_template

def dummy_data(num_samples=100, input_shape=(128, 128, 3), num_classes=10):
    """Generate dummy data for training."""
    X = np.random.random((num_samples, *input_shape))
    y = np.random.randint(0, num_classes, num_samples)
    return X, y

def get_default_train_config():
    return {
        'epochs': 5,
        'batchSize': 32
    }

def get_default_compile_config():
    return {
        'optimizer': 'adam',
        'loss': 'sparse_categorical_crossentropy',
        'metrics': ['accuracy']
    }

def train_model(compile_config, train_config):
    """
    Trains the existing CNN model using dummy data.
    
    Parameters:
      compile_config (dict): The configuration for the model compilation.
      train_config (dict): The configuration for the model training.

    Returns:
      The trained model and training history.
    """    

    X, y = dummy_data()

    model = tf.keras.models.load_model('backend/models/custom_cnn_model.keras')

    default_train_config = get_default_train_config()

    if compile_config['optimizer'] is None:
        compile_config['optimizer'] = get_default_compile_config()['optimizer']
    if compile_config['loss'] is None:
        compile_config['loss'] = get_default_compile_config()['loss']
    if compile_config['metrics'] is None:
        compile_config['metrics'] = get_default_compile_config()['metrics']

    if train_config['epochs'] is None:
        train_config['epochs'] = default_train_config['epochs']
    if train_config['batchSize'] is None:
        train_config['batchSize'] = default_train_config['batchSize']

    print('compile_config: ', compile_config)
    print('train_config: ', train_config)

    model.compile(optimizer=compile_config['optimizer'],
                  loss=compile_config['loss'],
                  metrics=[compile_config['metrics']])

    history = model.fit(X, y,
                        epochs=int(train_config['epochs']),
                        batch_size=int(train_config['batchSize']),
                        verbose=1)
    
    model.save_weights('backend/weights/custom_cnn_model.weights.h5')
    
    return model, history

if __name__ == "__main__":
    train_model()
