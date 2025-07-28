import { useState } from 'react';

const MinimalistInput = ({ 
  label = "Value",  // label text
  value,
  onChange, 
  min = 0, 
  max = 999, 
  step = 1
}) => {
  // determine if input is for string values (e.g., activation) or numeric
  const isStringType = typeof value === 'string' || String(label).trim().toLowerCase() === 'activation';
  const [isFocused, setIsFocused] = useState(false);
  // using controlled value prop; no local value state
  
  const tfOrange = '#FF6F00';

  const handleChange = (newValue) => {
    if (isStringType) {
      // for activation or other string inputs, accept raw value
      onChange?.(newValue);
    } else {
      // numeric input: parse and bound
      const parsedValue = parseFloat(newValue);
      if (!isNaN(parsedValue)) {
        const boundedValue = Math.max(min, Math.min(max, parsedValue));
        onChange?.(boundedValue);
      } else if (newValue === '') {
        onChange?.('');
      }
    }
  };

  return (
    <div className="flex justify-between items-center w-40">
      {label && <label style={{ color: '#e0e0e0' }} className="text-xs font-medium">{label}</label>}
      <input
        type={isStringType ? 'text' : 'number'}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...(!isStringType && { min, max, step })}
        className="py-2 px-3 text-center rounded-full focus:outline-none transition-all duration-200"
        style={{
          borderRadius: '10px',
          borderWidth: '2px',
          borderColor: isFocused ? tfOrange : '#555555',
          backgroundColor: '#2a2a2a',
          color: '#e0e0e0',
          boxShadow: isFocused ? `0 0 0 1px ${tfOrange}` : 'none',
          width: '50px'
        }}
      />
    </div>
  );
};

export default MinimalistInput;

