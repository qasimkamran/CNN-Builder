from keras.callbacks import Callback
import queue

LOG_QUEUE = queue.Queue()

class KerasCustomCallbacks(Callback):
    def on_epoch_end(self, epoch, logs=None):
        if logs:
            message = f"Epoch {epoch+1} - Loss: {logs['loss']:.4f} - Accuracy: {logs.get('accuracy', 0):.4f}"
            LOG_QUEUE.put(message)

    def on_batch_end(self, batch, logs=None):
        if logs:
            message = f"  Batch {batch+1} - Loss: {logs['loss']:.4f}"
            LOG_QUEUE.put(message)

    def on_train_end(self, logs=None):
        if logs:
            LOG_QUEUE.put("__END__")

