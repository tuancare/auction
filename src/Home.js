
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
    const [messages, setMessages] = useState([]);
    const onSubmit = (e) => {
        e.preventDefault();
    
        const { fieldset, message, donation } = e.target.elements;
    
        fieldset.disabled = true;
    
        // TODO: optimistically update page with new message,
        // update blockchain data in background
        // add uuid to each message, so we know which one is already known
        window.contract.addMessage(
          { text: message.value },
          BOATLOAD_OF_GAS,
          Big(donation.value || '0').times(10 ** 24).toFixed()
        ).then(() => {
            window.contract.getMessages().then(messages => {
            setMessages(messages);
            message.value = '';
            donation.value = SUGGESTED_DONATION;
            fieldset.disabled = false;
            message.focus();
          });
        });
      };
    const TransferN = (e) => {
        e.preventDefault();
        const transfer_acc = document.getElementById("transfer_acc");
        const transfer_num = document.getElementById("transfer_num");
    
        window.contract.transferNear(
          { receiver: transfer_acc.value,num: Big(transfer_num.value || '0').times(10 ** 24).toFixed(), }
        ).then(() => {
        });
      };
    return (
        <main>
        <header>
            <h1>NEAR Auction Gen-3</h1>            
        </header>
        { window.currentUser
            ? <Form onSubmit={onSubmit} currentUser={window.currentUser} TransferN={TransferN}/>
            : ''
        }
        { !!currentUser && !!messages.length && <Messages messages={messages}/> }
        </main>
    );
}