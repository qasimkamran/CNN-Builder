// src/components/InputLayerConfig.js
import React from 'react';

const InputLayerConfig = ({ inputLayer, setInputLayer }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputLayer(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="input-layer-config">
      <h3>Input Layer Configuration</h3>
      <label>
        Input Height: 
        <input type="text" name="height" value={inputLayer.height} onChange={handleChange} />
      </label>
      <br />
      <label>
        Input Width: 
        <input type="text" name="width" value={inputLayer.width} onChange={handleChange} />
      </label>
      <br />
      <label>
        Input Channels: 
        <input type="text" name="channels" value={inputLayer.channels} onChange={handleChange} />
      </label>
    </div>
  );
};

export default InputLayerConfig;
