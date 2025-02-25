// src/components/AvailableLayers.js
import React from 'react';

const AvailableLayers = ({ layers, addLayer }) => {
  return (
    <div className="available-layers">
      <h3>Available Layers</h3>
      <ul>
        {layers.map((layer, index) => (
          <li key={index} onClick={() => addLayer(layer)} style={{ cursor: 'pointer' }}>
            {layer.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableLayers;
