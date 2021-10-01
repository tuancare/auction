
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
      contract.getItems().then(products => {
        setProducts(products); 
        console.log(products);
      });
    }, []);
    function onJoinItem(item_code,base_price){      
      console.log('Join item to bid: '+base_price)
      window.contract.joinItem(
        { item_code:item_code},
        BOATLOAD_OF_GAS,
        Big(base_price).div(100).toFixed()
      ).then(() => {          
          //do nothing 
      });
    };
    function onCleanJoiner(item_code){      
      console.log('Clean all joiners:'+item_code)
      window.contract.cleanJoiner(
        { item_code:item_code}
      ).then(() => {          
          //do nothing 
      });
    };
    return (
        <main>
        <header>            
        </header>
        <div className="products-container">
          {products.map((product, i) =>
          
          <div key={i} className={i+ " products-item "+ product.item_code} >              
              <div className="products-item-name">
              {product.item_name} - ({product.item_code})
              </div>
              <div className="products-item-desc">
              {product.desc}
              </div>
              <div className="products-item-img">
                <img src={product.url}/>
              </div>
              <div className="products-item-price">
              {Big(product.base_price || '0').div(10 ** 24).toFixed()}(N)
              </div>
              <div className="products-item-bidders">
              {product.list_joiners}
              </div>
              <button id={"btn-bid-"+i} href="#" onClick={() => { onJoinItem(product.item_code,product.base_price) }}> Join to Bid</button>
              <button className="admin" id={"btn-bid-"+i} href="#" onClick={() => { onCleanJoiner(product.item_code) }}> Clean Joiners</button>
          </div>
          )}
          </div>
        </main>
    );
}