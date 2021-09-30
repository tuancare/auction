
import React, { useState, useEffect } from 'react';
import Big from 'big.js';
import Form from './components/Form';
import Messages from './components/Messages';

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
export default function Home() {
    if (!window.currentUser) {
        window.location.href="/account";
    }
    const [products, setProducts] = useState([]);
    useEffect(() => {
      // TODO: don't just fetch once; subscribe!
      contract.getProducts().then(products => {setProducts(products); });
    }, []);
    function onBid(id){
      //e.preventDefault();
      console.log(id)
      window.contract.bidProduct(
        { }
      ).then(() => {          
          fieldset.disabled = false;
          productcode.focus();
      });
    };
    return (
        <main>
        <header>            
        </header>
        <div className="products-container">
          {products.map((product, i) =>
          
          <div key={i} className={i+ " products-item "+ product.item_id} >
              <div className="products-item-id">
              {product.item_id}
              </div>
              <div className="products-item-desc">
              {product.desc}
              </div>
              <div className="products-item-img">
                <img src={product.url}/>
              </div>
              <div className="products-item-price">
              {product.base_price}
              </div>
              <div className="products-item-bidders">
              {product.list_joiners}
              </div>
              <button id={"btn-bid-"+i} href="#" onClick={() => { onBid(i) }}> Bid</button>
          </div>
          )}
          </div>
        </main>
    );
}