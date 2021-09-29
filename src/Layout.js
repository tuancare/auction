import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
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

    return (
        <div className="app">
            <div className="app__sidebar">
                <Menu />
            </div>
            <main className="app__content">
                <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/account" component={Login} /> 
                    <Route path="/" component={Home} />     
                                  
                </Switch>
            </main>
        </div>
    );
}
