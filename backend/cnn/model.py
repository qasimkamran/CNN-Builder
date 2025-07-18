import tensorflow as tf


def build_custom_model(layer_config, input_shape=(128, 128, 3)):
    """
    Builds a custom CNN model based on a list of layer configurations.
    
    Parameters:
      layer_config (list): List of dicts, each dict should have:
          - "type": The layer type as a string (e.g., "Conv2D", "MaxPooling2D", "Dense", "Flatten", "Dropout").
          - "params": A dict of keyword arguments to pass to the layer constructor.
      input_shape (tuple): Shape of the input data (default: (128, 128, 3)).
    
    Returns:
      A tf.keras.Sequential model constructed from the given configuration.
      
    Example layer_config:
      [
        {"type": "Conv2D", "params": {"filters": 32, "kernel_size": (3,3), "activation": "relu"}},
        {"type": "MaxPooling2D", "params": {"pool_size": (2,2)}},
        {"type": "Flatten", "params": {}},
        {"type": "Dense", "params": {"units": 10, "activation": "softmax"}}
      ]
    """
    model = tf.keras.Sequential()
    # Add an input layer to start
    model.add(tf.keras.layers.InputLayer(input_shape=input_shape))
    
    for layer in layer_config:
        layer_type = layer.get("type")
        params = layer.get("params", {})
        
        if layer_type == "Conv2D":
            model.add(tf.keras.layers.Conv2D(**params))
        elif layer_type == "MaxPooling2D":
            model.add(tf.keras.layers.MaxPooling2D(**params))
        elif layer_type == "Flatten":
            model.add(tf.keras.layers.Flatten())
        elif layer_type == "Dense":
            model.add(tf.keras.layers.Dense(**params))
        elif layer_type == "Dropout":
            model.add(tf.keras.layers.Dropout(**params))
        else:
            raise ValueError(f"Unsupported layer type: {layer_type}")
    
    return model


def get_default_template():
    """
    Provides a default CNN template configuration.
    
    Returns:
      A list of dictionaries representing a simple CNN.
    """
    return [
        {"type": "Conv2D", "params": {"filters": 32, "kernel_size": (3, 3), "activation": "relu"}},
        {"type": "MaxPooling2D", "params": {"pool_size": (2, 2)}},
        {"type": "Conv2D", "params": {"filters": 64, "kernel_size": (3, 3), "activation": "relu"}},
        {"type": "MaxPooling2D", "params": {"pool_size": (2, 2)}},
        {"type": "Flatten", "params": {}},
        {"type": "Dense", "params": {"units": 128, "activation": "relu"}},
        {"type": "Dense", "params": {"units": 10, "activation": "softmax"}}
    ]


def save_model(model, model_name):
    model.save(f'backend/models/{model_name}.keras')
    model.summary()

