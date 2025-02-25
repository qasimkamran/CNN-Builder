# cnn/evaluate.py
import tensorflow as tf
import numpy as np

def dummy_data(num_samples=20, input_shape=(128, 128, 3), num_classes=10):
    """Generate dummy data for evaluation."""
    X = np.random.random((num_samples, *input_shape))
    y = np.random.randint(0, num_classes, num_samples)
    return X, y

def evaluate_model(model_path='custom_cnn_model.h5'):
    """
    Loads the saved model and evaluates its performance on dummy data.
    
    Parameters:
      model_path (str): Path to the saved model.
    """
    # Load the saved model.
    model = tf.keras.models.load_model(model_path)
    
    # Generate dummy evaluation data.
    X, y = dummy_data()
    
    # Evaluate the model.
    results = model.evaluate(X, y, verbose=1)
    print("Evaluation Results:")
    print("Loss:", results[0])
    print("Accuracy:", results[1])

if __name__ == "__main__":
    evaluate_model()
