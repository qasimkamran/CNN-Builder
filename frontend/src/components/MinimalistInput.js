import { useState } from 'react';

const MinimalistInput = ({ 
  label = "Value", 
  onChange, 
  min = 0, 
  max = 999, 
  step = 1,
  initialValue = 0
}) => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  
  const tfOrange = '#FF6F00';

  const handleChange = (newValue) => {
    const parsedValue = parseFloat(newValue);
    if (!isNaN(parsedValue)) {
      const boundedValue = Math.max(min, Math.min(max, parsedValue));
      setValue(boundedValue);
      onChange?.(boundedValue);
    } else if (newValue === '') {
      setValue('');
    }
  };

  return (
    <div className="flex justify-between items-center w-40">
      {label && <label style={{ color: '#e0e0e0' }} className="text-xs font-medium">{label}</label>}
      <input
        type="number"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        min={min}
        max={max}
        step={step}
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

