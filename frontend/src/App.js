// src/App.js
import React, { useState } from 'react';
import InputLayerConfig from './components/InputLayerConfig';
import AvailableLayers from './components/AvailableLayers';
import ArchitectureTable from './components/ArchitectureTable';
import ModelActions from './components/ModelActions';
import { preConfiguredLayers, defaultTemplate } from './data';
import { sendTrainRequest, sendSaveRequest } from './api';
import './styles/components.css';

function App() {
  const [inputLayer, setInputLayer] = useState({
    height: 128,
    width: 128,
    channels: 3
  });
  const [architecture, setArchitecture] = useState(defaultTemplate);

  const addLayer = (layer) => {
    setArchitecture(prev => [...prev, layer]);
  };

  const updateLayerParam = (index, key, value) => {
    setArchitecture(prev => {
      const newArch = [...prev];
      newArch[index] = { ...newArch[index], params: { ...newArch[index].params, [key]: value } };
      return newArch;
    });
  };

  const removeLayer = (index) => {
    setArchitecture(prev => prev.filter((_, i) => i !== index));
  };

  const moveLayerUp = (index) => {
    if (index === 0) return;
    setArchitecture(prev => {
      const newArch = [...prev];
      [newArch[index - 1], newArch[index]] = [newArch[index], newArch[index - 1]];
      return newArch;
    });
  };

  const moveLayerDown = (index) => {
    if (index === architecture.length - 1) return;
    setArchitecture(prev => {
      const newArch = [...prev];
      [newArch[index], newArch[index + 1]] = [newArch[index + 1], newArch[index]];
      return newArch;
    });
  };

  const handleTrain = (trainParams) => {
    const payload = {
      input_layer: {
        input_shape: [
          Number(inputLayer.height),
          Number(inputLayer.width),
          Number(inputLayer.channels)
        ]
      },
      layer_config: architecture,
      compile_config: {
        optimizer: trainParams.optimizer,
        loss: trainParams.loss,
        metrics: trainParams.metrics
      },
      train_config: {
        epochs: trainParams.epochs,
        batchSize: trainParams.batchSize
      }
    };

    sendTrainRequest(payload)
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  const handleSave = () => {
    const payload = {
      layer_config: architecture
    };
    sendSaveRequest(payload)
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <h1>Build-a-CNN</h1>
      <InputLayerConfig inputLayer={inputLayer} setInputLayer={setInputLayer} />
      <div style={{ display: 'flex', gap: '20px' }}>
        <AvailableLayers layers={preConfiguredLayers} addLayer={addLayer} />
        <ArchitectureTable 
          architecture={architecture} 
          updateLayerParam={updateLayerParam} 
          removeLayer={removeLayer}
          moveLayerUp={moveLayerUp}
          moveLayerDown={moveLayerDown}
        />
      </div>
      <ModelActions onTrain={handleTrain} onSave={handleSave} />
    </div>
  );
}

export default App;
