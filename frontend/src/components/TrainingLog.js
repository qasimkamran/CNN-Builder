import React, { useEffect, useRef } from 'react';

const TrainingLog = ({ logs = [] }) => {
  const preRef = useRef(null);
  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [logs]);
  return (
    <div className="card">
      <h2>Training Log</h2>
      <pre
        ref={preRef}
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          margin: 0,
          fontFamily: 'monospace',
          color: '#e0e0e0',
        }}
      >
        {logs.join('\n')}
      </pre>
    </div>
  );
};

export default TrainingLog;

