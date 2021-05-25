import React from 'react';

export default function Input({ name, label, value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        id={name}
        name={name}
        type="text"
        className="form-control"
        onChange={onChange}
      />
    </div>
  );
}
