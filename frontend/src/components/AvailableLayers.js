import React from 'react';
import './AvailableLayers.css';

const AvailableLayers = ({ layers, addLayer }) => {
  return (
    <div className="card">
      <h3>Available Layers</h3>
      <div className="available-layers-container">
          <ul>
            {layers.map((layer, index) => (
              <li key={index} onClick={() => addLayer(layer)} style={{ cursor: 'pointer' }}>
                {layer.type}
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default AvailableLayers;

