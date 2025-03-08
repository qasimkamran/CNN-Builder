// src/components/ModelActions.js
import React, { useState } from 'react';
import MinimalistInput from './MinimalistInput';
import './ModelActions.css';

const ModelActions = ({ onTrain, onSave }) => {
  const [optimizer, setOptimizer] = useState('adam');
  const [loss, setLoss] = useState('sparse_categorical_crossentropy');
  const [metrics, setMetrics] = useState('accuracy');
  const [epochs, setEpochs] = useState(10);
  const [batchSize, setBatchSize] = useState(32);

  const handleTrain = () => {
    onTrain({ optimizer, loss, metrics, epochs, batchSize });
  };

  return (
    <div className="card">
      <h2>Model Actions</h2>
      <div>
        <h3>Compilation Parameters</h3>
        <table>
          <tbody>
            <tr>
              <td>Optimizer</td>
              <td>
                <select value={optimizer} onChange={(e) => setOptimizer(e.target.value)}>
                  <option value="adam">Adam</option>
                  <option value="sgd">SGD</option>
                  <option value="rmsprop">RMSprop</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Loss</td>
              <td>
                <select value={loss} onChange={(e) => setLoss(e.target.value)}>
                  <option value="sparse_categorical_crossentropy">Sparse Categorical Crossentropy</option>
                  <option value="categorical_crossentropy">Categorical Crossentropy</option>
                  <option value="binary_crossentropy">Binary Crossentropy</option>
                  <option value="mean_squared_error">Mean Squared Error</option>
                  <option value="mean_absolute_error">Mean Absolute Error</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Metrics</td>
              <td>
                <select value={metrics} onChange={(e) => setMetrics(e.target.value)}>
                  <option value="accuracy">Accuracy</option>
                  <option value="precision">Precision</option>
                  <option value="recall">Recall</option>
                  <option value="f1_score">F1 Score</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <h3>Training Parameters</h3>
        <table>
          <tbody>
            <tr>
              <td>Epochs</td>
              <td>
                <MinimalistInput
                  label=""
                  value={epochs}
                  onChange={(value) => setEpochs(Number(value))}
                />
              </td>
            </tr>
            <tr>
              <td>Batch Size</td>
              <td>
                <MinimalistInput
                  label=""
                  value={batchSize}
                  onChange={(value) => setBatchSize(Number(value))}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="action-buttons">
        <button onClick={onSave}>Save Model</button>
        <button onClick={handleTrain}>Train Model</button>
      </div>
    </div>
  );
};

export default ModelActions;
