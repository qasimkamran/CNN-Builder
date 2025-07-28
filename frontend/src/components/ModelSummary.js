import React from 'react';

const ModelSummary = ({ summary }) => (
  <div className="card">
    <h2>Model Summary</h2>
    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{summary}</pre>
  </div>
);

export default ModelSummary;