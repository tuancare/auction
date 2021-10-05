import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import DateTimePicker from 'react-datetime-picker';

export default function NewProduct({ onSubmit}) {
  const [value, onChange] = useState(new Date());
  
  return (
    <div>
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        
        <p className="highlight">
          <label htmlFor="message">Code:</label>
          <input autoComplete="off" autoFocus id="productcode" required />
        </p>
        <p className="highlight">
          <label htmlFor="message">Name:</label>
          <input autoComplete="off" autoFocus id="productname" required />
        </p>
        <p className="highlight">
          <label htmlFor="message">Description:</label>
          <input autoComplete="off"  id="productdesc" required />
        </p>
        <p className="highlight">
          <label htmlFor="message">URL:</label>
          <input autoComplete="off"  id="producturl" required />
        </p>
        <p className="highlight">
          <label htmlFor="message">Price:</label>
          <input autoComplete="off"  id="productprice"
            defaultValue={'0.1'}
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number" required />
        </p>
        <p className="highlight">
          <label htmlFor="message">Start time:</label>
          
        </p>
        <DateTimePicker id="start_time"
            onChange={onChange}
            value={value}
          />
          <input type="hidden" value={Date.parse(value)} id="starttime"/>
        
        <button type="submit">
          Save
        </button>
      </fieldset>      
    </form>
    </div>
  );
}


