# app/routes.py
from flask import Blueprint, render_template, request, jsonify
from cnn.train import train_model  # Import the training function from your CNN module

main = Blueprint('main', __name__)

@main.route('/')
def index():
    # Render the UI with a default CNN template.
    return render_template('index.html')

@main.route('/train', methods=['POST'])
def train():
    # Parse the JSON containing the CNN configuration.
    data = request.get_json()
    layer_config = data.get('layer_config') if data and 'layer_config' in data else None

    try:
        # Trigger the training process using the provided configuration (or default if None)
        model, history = train_model(layer_config=layer_config)
        return jsonify({'status': 'success', 'message': 'Training completed.'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})
