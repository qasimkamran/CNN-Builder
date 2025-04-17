# backend/config.py

class Config:
    DEBUG = True
    # Pre-configured layer templates that the UI can use for adding new layers.
    PRE_CONFIGURED_LAYERS = [
        {"type": "Conv2D", "params": {"filters": 32, "kernel_size": [3, 3], "activation": "relu"}},
        {"type": "MaxPooling2D", "params": {"pool_size": [2, 2]}},
        {"type": "Flatten", "params": {}},
        {"type": "Dense", "params": {"units": 10, "activation": "softmax"}}
    ]
    # Default CNN template to load into the table on startup.
    DEFAULT_CNN_TEMPLATE = [
        {"type": "Conv2D", "params": {"filters": 32, "kernel_size": [3, 3], "activation": "relu"}},
        {"type": "MaxPooling2D", "params": {"pool_size": [2, 2]}},
        {"type": "Flatten", "params": {}},
        {"type": "Dense", "params": {"units": 10, "activation": "softmax"}}
    ]
