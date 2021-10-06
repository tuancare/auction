import React, { useState, useEffect } from 'react';
import NewProduct from './components/NewProduct';
import Big from 'big.js';
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";

export default function Home() {
    if (!window.currentUser) {
        window.location.href="/account";
    }
    const [product, setProduct] = useState([]);
    const [list_bids, setList_bids] = useState([]);
    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
    let query = useQuery();
    let productcode=query.get("productcode");
    
           
    useEffect(() => {      
        contract.getItemByCode({ item_code:productcode}
            ).then(product => {
          setProduct(product); 
          console.log(product);          
        });
      }, []);
    useEffect(() => {      
        contract.getJoinerBids({ item_code:productcode}).then(list_bids => {
            setList_bids(list_bids); 
          console.log(list_bids);        
        });
      }, []);
    
      const onBid = (e) => {
        e.preventDefault();
    
        
        let bidprice = document.getElementById("bidprice");
        console.log(bidprice.value);
              
        window.contract.bidOnItem(
          { item_code:productcode, 
            bid_price:  Big(bidprice.value || '0').times(10 ** 24).toFixed()}
        ).then(() => {          
            
        });
      };
    
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
        <div className="bid-area">
            <p className="highlight">
            <label htmlFor="message">Price to bid:</label>
            <input autoComplete="off"  id="bidprice"
                defaultValue={'0.1'}
                max={Big(currentUser.balance).div(10 ** 24)}
                min="0"
                step="0.01"
                type="number" required />
            </p>
            <button type="button" onClick={onBid}>
                Bid
            </button>
        </div>
        <div className="joiner-bid-list">
        {list_bids.map((joiner_bid, i) =>
          
          <div key={i} className={i+ " products-item "+ joiner_bid.bid_id} >              
              <div className="bid-joiner-name">
              {joiner_bid.joiner}
              </div>
              <div className="bid-joiner-price">
              {joiner_bid.bid_price}
              </div>
              <div className="bid-joiner-time">
              {joiner_bid.bid_time}
              </div>
              
          </div>
          )}
        </div>
        </main>
    );
}