import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import DateTimePicker from 'react-datetime-picker';

export default function PDP({ product}) {
  const [value, onChange] = useState(new Date());
  
  return (
    <main>
        <header>            
        </header>
        <div className="pdp-container">
                   
              <div className="product-name">
              {product.item_name} - ({product.item_code})
              </div>
              <div className="product-desc">
              {product.desc}
              </div>
              <div className="product-img">
                <img src={product.url}/>
              </div>
              <div className="product-price">
              {Big(product.base_price || '0').div(10 ** 24).toFixed()}(N)
              </div>
              <div className="products-item-bidders">
              {product.list_joiners}
              </div>
              
              { window.currentUser.accountId== product.owner? 
                <button className="admin" id={"btn-bid-"+i} href="#" onClick={() => { onCleanJoiner(product.item_code) }}> Clean Joiners</button>:
              ''
              }
          </div>

        </main>
  );
}


