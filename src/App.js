import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

export default function App({ contract, currentUser, nearConfig, wallet }) {
    return (
        <BrowserRouter>
            <Layout contract={contract} currentUser={currentUser} nearConfig={nearConfig} wallet={wallet}/>
        </BrowserRouter>
    )
}