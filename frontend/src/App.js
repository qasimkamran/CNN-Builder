import React, { useState } from 'react';
import InputLayerConfig from './components/InputLayerConfig';
import AvailableLayers from './components/AvailableLayers';
import ArchitectureTable from './components/ArchitectureTable';
import ModelActions from './components/ModelActions';
import { preConfiguredLayers, defaultTemplate } from './data';
import { sendTrainRequest, sendSaveRequest } from './api';
import './styles/components.css';
import ModelSummary from 'components/ModelSummary';
import LogMessage from 'components/LogMessage';
import TrainingLog from 'components/TrainingLog';


function App() {
  const [inputLayer, setInputLayer] = useState({
    height: 128,
    width: 128,
    channels: 3
  });
  const [architecture, setArchitecture] = useState(defaultTemplate);
  const [modelSummary, setModelSummary] = useState(null);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isTraining, setIsTraining] = useState(false);

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

    setIsTraining(true);
    setLogs([]);
    const eventSource = new EventSource('/train/logs');
    eventSource.onmessage = (e) => {
      setLogs(prev => [...prev, e.data]);
      if (e.data === 'Training completed' || e.data.startsWith('Training error')) {
        eventSource.close();
      }
    };
    eventSource.onerror = (e) => {
      console.error('SSE error:', e);
      eventSource.close();
    };
    sendTrainRequest(payload)
      .then(response => {
        const { status, message: respMsg } = response.data;
        setMessage(respMsg);
        setIsError(status === 'error');
      })
      .catch(err => {
        const errMsg = err.response?.data?.message || err.message;
        setMessage(errMsg);
        setIsError(true);
      })
  };

  const handleSave = () => {
    const payload = { layer_config: architecture };
    sendSaveRequest(payload)
      .then(response => {
        const { status, message: respMsg, summary } = response.data;
        setMessage(respMsg);
        setIsError(status === 'error');
        if (status === 'success' && summary) {
          setModelSummary(summary);
        }
      })
      .catch(err => {
        const errMsg = err.response?.data?.message || err.message;
        setMessage(errMsg);
        setIsError(true);
      });
  };

  return (
    <div className="App">
      <h1>Build-a-CNN</h1>
      <InputLayerConfig inputLayer={inputLayer} setInputLayer={setInputLayer} />
      <div className="architecture-table-container">
        <AvailableLayers layers={preConfiguredLayers} addLayer={addLayer} />
        <ArchitectureTable 
          architecture={architecture} 
          updateLayerParam={updateLayerParam} 
          removeLayer={removeLayer}
          moveLayerUp={moveLayerUp}
          moveLayerDown={moveLayerDown}
        />
      </div>
      <div className="actions-summary-container">
        {isTraining && <TrainingLog logs={logs} />}
        <ModelActions onTrain={handleTrain} onSave={handleSave} />
        {modelSummary && <ModelSummary summary={modelSummary} />}
      </div>
      {message && (
        <LogMessage
          message={message}
          isError={isError}
        />
      )}
    </div>
  );
}

export default App

