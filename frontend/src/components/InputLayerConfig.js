// src/components/InputLayerConfig.js
import React from 'react';
import MinimalistInput from './MinimalistInput';
import './InputLayerConfig.css';

const InputLayerConfig = ({ inputLayer, setInputLayer }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputLayer(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card">
      <h3>Input Layer Configuration</h3>
      <div className="input-layer-config">
        <label>
          <MinimalistInput
            label="Input Height"
            value={inputLayer.height}
            onChange={(value) => setInputLayer({ ...inputLayer, height: value })}
          />
        </label>
        <label>
          <MinimalistInput
            label="Input Width"
            value={inputLayer.width}
            onChange={(value) => setInputLayer({ ...inputLayer, width: value })}
          />
        </label>
        <label>
          <MinimalistInput
            label="Input Channels"
            value={inputLayer.channels}
            onChange={(value) => setInputLayer({ ...inputLayer, channels: value })}
          />
        </label>
      </div>
      </div>
  );
};

export default InputLayerConfig;
