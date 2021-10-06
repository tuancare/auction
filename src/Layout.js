import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import Contact from "./Contact";
import Login from "./Login";
import Menu from "./Menu";


export default function Layout({ contract, currentUser, nearConfig, wallet }) {
    useEffect(() => {
        // TODO: don't just fetch once; subscribe!
        contract.getMessages().then();
    }, []);
    window.contract=contract;
    window.currentUser=currentUser;
    window.nearConfig=nearConfig;
    window.wallet=wallet;
    const signIn = () => {
        window.wallet.requestSignIn(
          window.nearConfig.contractName,
          'NEAR Auction Gen-3'
        );
      };
    const signOut = () => {
        window.wallet.signOut();
        window.location.replace(window.location.origin + window.location.pathname);
      };
    return (
        <div className="container">
            <div className="header">
                <div className="header-logo">
                    Auction
                </div>
                <div className="header-breadcumbs">
                    best bid, best buy
                </div>
                <div className="header-account">
                    {!window.currentUser
                        ?<a href="#" onClick={signIn}>Login</a>
                        :<a href="#" onClick={signOut}>Logout</a>
                    }
                </div>
            </div>
            <div className="app">
                <div className="app__sidebar">
                    <Menu />
                </div>
                <main className="app__content">
                    <Switch>
                        <Route path="/products" component={Products} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/account" component={Login} /> 
                        <Route path="/pdp/:productcode" component={ProductDetail} /> 
                        <Route path="/" component={Home} />     
                                    
                    </Switch>
                </main>
            </div>

        </div>
    );
}
