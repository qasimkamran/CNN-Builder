# app/routes.py
from flask import Blueprint, render_template, request, jsonify, current_app
from cnn.train import train_model

main = Blueprint('main', __name__)

@main.route('/')
def index():
    pre_configured_layers = current_app.config.get("PRE_CONFIGURED_LAYERS")
    default_template = current_app.config.get("DEFAULT_CNN_TEMPLATE")
    return render_template('index.html', 
                           pre_configured_layers=pre_configured_layers, 
                           default_template=default_template)

@main.route('/train', methods=['POST'])
def train():
    data = request.get_json()
    layer_config = data.get('layer_config') if data and 'layer_config' in data else None
    try:
        model, history = train_model(layer_config=layer_config)
        return jsonify({'status': 'success', 'message': 'Training completed.'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})
