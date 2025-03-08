// src/components/ArchitectureTable.js
import React from 'react';
import MinimalistInput from './MinimalistInput';
import './ArchitectureTable.css';

const ArchitectureTable = ({ architecture, updateLayerParam, removeLayer, moveLayerUp, moveLayerDown }) => {
  return (
    <div className="card">
      <h3>Current Architecture</h3>
      <table className="architecture-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Layer Type</th>
            <th>Parameters</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {architecture.map((layer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{layer.type}</td>
              <td className="architecture-table-param">
                {Object.keys(layer.params).length > 0 ? (
                  Object.keys(layer.params).map((key, i) => (
                    <div key={i}>
                      <label>{key}: </label>
                      <MinimalistInput
                        label=""
                        value={layer.params[key]}
                        onChange={(value) => updateLayerParam(index, key, value)}
                      />
                    </div>
                  ))
                ) : (
                  "No parameters"
                )}
              </td>
              <td>
                <button onClick={() => removeLayer(index)}>Delete</button>
                <button onClick={() => moveLayerUp(index)} disabled={index === 0}>Up</button>
                <button onClick={() => moveLayerDown(index)} disabled={index === architecture.length - 1}>Down</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArchitectureTable;
