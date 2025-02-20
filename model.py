'''
Model for the project.
'''

import tensorflow as tf
from data import split_data, resize_images, load_data

def create_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(160, 160, 3)),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    return model

def compile_model(model: tf.keras.Model):
    model.compile(optimizer='adam',
                  loss='binary_crossentropy',
                  metrics=['accuracy'])
    return model

def train_model(model: tf.keras.Model, train_dataset: tf.data.Dataset, test_dataset: tf.data.Dataset):
    model.fit(train_dataset,
        epochs=10,
        validation_data=test_dataset)
    return model

if __name__ == '__main__':
    # Model creation
    model = create_model()
    model = compile_model(model)
    model.summary()

    # Data loading and preprocessing
    dataset = load_data('cats_vs_dogs')
    train_dataset, test_dataset = split_data(dataset)
    
    train_dataset = train_dataset.map(resize_images)
    test_dataset = test_dataset.map(resize_images)
    
    train_dataset = train_dataset.batch(32)
    test_dataset = test_dataset.batch(32)

    # Model training
    model = train_model(model, train_dataset, test_dataset)
    model.save('model.keras')
