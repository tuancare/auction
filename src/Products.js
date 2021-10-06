import React from 'react';
import NewProduct from './components/NewProduct';
import Big from 'big.js';
export default function Home() {
    if (!window.currentUser) {
        window.location.href="/account";
    }
    const onSubmit = (e) => {
        e.preventDefault();
    
        const { fieldset, productcode,productname, productdesc,producturl,productprice,starttime,lentime } = e.target.elements;
        
        console.log(starttime.value);
        fieldset.disabled = true;
        
        //TODO: optimistically update page with new message,
        //update blockchain data in background        
        window.contract.addNewItem(
          { 
            productcode:productcode.value, 
            productname:productname.value, 
            productdesc:productdesc.value,
            producturl:producturl.value,
            productprice: Big(productprice.value || '0').times(10 ** 24).toFixed(),
            start_time:Big(starttime.value).times(10**6).toFixed(),
            len_time:Big(lentime.value).times(60 * 10**9).toFixed() // million millisecon in near blockTimestamp 
        }
        ).then(() => {          
            fieldset.disabled = false;
            productcode.focus();
        });
      };
    return (
        <NewProduct onSubmit={onSubmit}/>
    );
}