from flask import Flask
from flask_cors import CORS
import os
import logging
from logging.handlers import RotatingFileHandler
from .config import Config
from .routes import main


def create_app():
    app = Flask(__name__)

    CORS(app,
         resources={r"/*": {"origins": "http://localhost:3000"}},
         methods=["GET", "POST", "OPTIONS"],
         supports_credentials=True
    )

    app.config.from_object(Config)

    log_dir = os.path.join(os.path.dirname(__file__), 'logs')

    os.makedirs(log_dir, exist_ok=True)

    log_file = os.path.join(log_dir, 'backend.log')

    handler = RotatingFileHandler(log_file, maxBytes=1_000_000, backupCount=5)
    handler.setLevel(logging.INFO)
    handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s: %(message)s'))

    app.logger.addHandler(handler)
    app.config['LOG_FILE'] = log_file

    app.register_blueprint(main)

    return app

