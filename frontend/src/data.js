// src/data.js
export const preConfiguredLayers = [
    { type: "Conv2D", params: { filters: 32, kernel_size: 3, activation: "relu" } },
    { type: "MaxPooling2D", params: { pool_size: 2 } },
    { type: "Flatten", params: {} },
    { type: "Dense", params: { units: 10, activation: "softmax" } }
  ];
  
  export const defaultTemplate = [
    { type: "Conv2D", params: { filters: 32, kernel_size: 3, activation: "relu" } },
    { type: "MaxPooling2D", params: { pool_size: 2 } },
    { type: "Flatten", params: {} },
    { type: "Dense", params: { units: 10, activation: "softmax" } }
  ];
  