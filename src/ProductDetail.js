import React, { useState, useEffect } from 'react';
import NewProduct from './components/NewProduct';
import Big from 'big.js';
import moment from 'moment';
import timezone from 'moment-timezone'

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
    let highest_price=null;
    let highest_price_joiner='';
    let xxx=null;           
    useEffect(() => {
      getItem();
      return () => {
        setProduct({});
      };
    }, []);
    useEffect(() => {
      getJoinerBids();
      return () => {
        setList_bids({});
      };
    }, []);    
    
  const getItem = () => {
      contract.getItemByCode({ item_code:productcode}
          ).then(product => {
        setProduct(product); 
        getlist_joiners(product);
        console.log(product);          
      });
    }
    
  const getJoinerBids = () => {
      contract.getJoinerBids({ item_code:productcode}).then(list_bids => {
        setList_bids(list_bids);         
        
        
    });
    }
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
    const get_highest_price= () => {
      highest_price=0;
      for(var i=0;i< list_bids.length;i++) {          
        var bprice = new Big(list_bids[i].bid_price||'0').div(10**24);
        
        if (bprice.gt(new Big(highest_price))){
          highest_price=bprice;
          highest_price_joiner='('+list_bids[i].joiner+')';
        }
      }      
      
      return highest_price.toFixed();
    }

    function getlist_joiners(item){
      console.log('aaaaaaaaa');
      console.log(item.list_joiners);
      var rows = [], i = 0, len = item.list_joiners.length;
      while (++i <= len) rows.push(item.list_joiners[i]);

      xxx=(
        <ul>
            {rows.map(function(name, index){
                return <li key={ index }>{name}</li>;
              })}
        </ul>
    )
    return xxx;
    }

    return (
        <main>
        <header>            
        </header>
        <div className="pdp-container">
              <div className="pdp-left">
                <div className="product-img">
                  <img src={product.url}/>
                </div>
              </div>
              <div className="pdp-right">     
                <div className="product-name pdp-line">
                {product.item_name} - ({product.item_code})
                </div>
                <div className="product-price pdp-line">
                {Big(product.base_price || '0').div(10 ** 24).toFixed()}(N)
                </div>
                <div className="product-desc pdp-line">
                  <span className="pdp-field-title">Description: </span>{product.desc}
                </div>
                <div className="product-start-time pdp-line">
                  <span className="pdp-field-title">Start time: </span>
                  { moment.unix(Big(product.start_time || '0').div(10**9).round(0,0).toFixed()).format() }
                </div>
                <div className="product-period pdp-line">
                  <span className="pdp-field-title">Period: </span>{ Big(product.len_time|| '0').div(60*10**9).toFixed() } (mins)
                </div>
                <div className="product-status pdp-line">
                  <span className="pdp-field-title">Status: </span>
                </div>
                <div className="product-highest-price pdp-line">
                  <span className="pdp-field-title">Highest bid price:</span>
                  <span className="highest"> 
                    {get_highest_price() } (N) 
                    {highest_price_joiner}
                  </span>
                </div>
              </div>
              
              
              
              { window.currentUser.accountId== product.owner? 
                <button className="admin" id="btn-clean" href="#" onClick={() => { onCleanJoiner(product.item_code) }}> Clean Joiners</button>:
              ''
              }
        </div>
        <div className="joiner-and-bid">
          <div className="products-item-bidders">
          {product.list_joiners}
          
          </div>        
          <div className="joiner-bid-container">
            <div className="bid-area">
                <div className="pdp-price-to-bid">
                  <label htmlFor="message">Price to bid:</label>
                  <input autoComplete="off"  id="bidprice"
                      defaultValue={'0.1'}
                      max={Big(currentUser.balance).div(10 ** 24)}
                      min="0"
                      step="0.01"
                      type="number" required />
                      (N)
                </div>
                <button className="pdp-bid-btn" type="button" onClick={onBid}>
                    Bid
                </button>
            </div>
            <div className="joiner-bid-list">
            {list_bids.map((joiner_bid, j) =>
              
              <div key={j} className={j+ " products-item "+ joiner_bid.bid_id} >              
                  <div className="bid-joiner-name">
                  {joiner_bid.joiner}
                  </div>
                  <div className="bid-joiner-price">              
                  {Big(joiner_bid.bid_price || '0').div(10 ** 24).toFixed()}(N)
                  </div>
                  <div className="bid-joiner-time">
                  {                
                    moment.unix(Big(joiner_bid.bid_time || '0').div(10**9).round(0,0).toFixed()).format()
                  }
                  </div>
                  
              </div>
              )}
            </div>
          </div>
        </div>
        </main>
    );
}