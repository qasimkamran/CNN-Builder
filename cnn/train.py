# cnn/train.py
import tensorflow as tf
import numpy as np
from .model import build_custom_model, get_default_template

def dummy_data(num_samples=100, input_shape=(128, 128, 3), num_classes=10):
    """Generate dummy data for training."""
    X = np.random.random((num_samples, *input_shape))
    y = np.random.randint(0, num_classes, num_samples)
    return X, y

def train_model(layer_config=None, epochs=5):
    """
    Builds, compiles, and trains the CNN model using dummy data.
    
    Parameters:
      layer_config (list): Custom CNN configuration; if None, the default template is used.
      epochs (int): Number of training epochs.
    
    Returns:
      The trained model and training history.
    """
    if layer_config is None:
        layer_config = get_default_template()
    
    # Build the model from the provided configuration.
    model = build_custom_model(layer_config)
    model.compile(optimizer='adam', 
                  loss='sparse_categorical_crossentropy', 
                  metrics=['accuracy'])
    
    # Generate dummy training data.
    X, y = dummy_data()
    
    # Train the model.
    history = model.fit(X, y, epochs=epochs, verbose=1)
    
    # Save the trained model.
    model.save('runs/custom_cnn_model.h5')
    print("Model saved as runs/custom_cnn_model.h5")
    
    return model, history

if __name__ == "__main__":
    train_model()
