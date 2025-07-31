from flask import \
    Blueprint, render_template, request, jsonify, current_app, abort
from backend.cnn.train import train_model
from backend.cnn.model import build_custom_model, save_model
import io


main = Blueprint('main', __name__)

@main.route('/')
def index():
    log_file = current_app.config.get('LOG_FILE', '../logs/temp.log')
    try:
        with open(log_file) as f:
            logs = f.read()
    except Exception:
        logs = 'Log file not found or unreadable.'
    return render_template('index.html', logs=logs)


@main.route('/train', methods=['POST'])
def train():
    data = request.get_json()
    if data is None:
        abort(400, "Missing JSON payload")
    compile_config = data.get('compile_config')
    train_config = data.get('train_config')
    try:
        current_app.logger.info("Training with compile_config: %s, train_config: %s", compile_config, train_config)
        model, history = train_model(compile_config, train_config)
        current_app.logger.info("Training completed successfully.")
        return jsonify({'status': 'success', 'message': 'Training completed.'})
    except Exception as e:
        current_app.logger.error("Training error: %s", str(e))
        return jsonify({'status': 'error', 'message': str(e)})


@main.route('/save', methods=['POST', 'OPTIONS'])
def save():
    data = request.get_json()
    layer_config = data.get('layer_config') if data and 'layer_config' in data else None
    try:
        current_app.logger.info("Saving model with layer_config: %s", layer_config)
        model = build_custom_model(layer_config)
        buf = io.StringIO()
        model.summary(print_fn=lambda line: buf.write(line + '\n'))
        summary_str = buf.getvalue()
        save_model(model, 'custom_cnn_model')
        current_app.logger.info("Model saved successfully.")
        return jsonify({
            'status': 'success', 
            'message': 'Model saved successfully.', 
            'summary': summary_str
        })
    except Exception as e:
        current_app.logger.error("Model save error: %s", str(e))
        return jsonify({'status': 'error', 'message': str(e)})

