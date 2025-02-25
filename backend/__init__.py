# backend/__init__.py
from flask import Flask
from .config import Config  # Import the Config class from config.py

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # Load configuration from Config

    # Import and register blueprints using relative import
    from .routes import main
    app.register_blueprint(main)

    return app
