import React from 'react';

export default function Field({ label, onChange, ...rest }) {
  return (
    <div className="field">
      <div className="ui labeled input plaincontainer">
        <label className="ui label">{label}</label>
        <input 
          {...rest}
          type="text" 
          onChange={onChange} 
          />
      </div>
    </div>
  )
}
