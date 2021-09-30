import React from 'react';
import NewProduct from './components/NewProduct';
import Big from 'big.js';
export default function Home() {
    if (!window.currentUser) {
        window.location.href="/account";
    }
    const onSubmit = (e) => {
        e.preventDefault();
    
        const { fieldset, productcode, productdesc,producturl,productprice } = e.target.elements;
    
        fieldset.disabled = true;
    
        // TODO: optimistically update page with new message,
        // update blockchain data in background
        // add uuid to each message, so we know which one is already known
        window.contract.addNewProduct(
          { productcode:productcode.value, 
            productdesc:productdesc.value,
            producturl:producturl.value,
            productprice: Big(productprice.value || '0').times(10 ** 24).toFixed()}
        ).then(() => {          
            fieldset.disabled = false;
            productcode.focus();
        });
      };
    return (
        <NewProduct onSubmit={onSubmit}/>
    );
}