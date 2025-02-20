# cnn/__init__.py
# This file makes the 'cnn' folder a Python package.

from .model import build_custom_model, get_default_template
from .evaluate import evaluate_model
from .train import train_model

__all__ = ['build_custom_model', 'get_default_template', 'evaluate_model', 'train_model']
