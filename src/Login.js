
import React from 'react';

export default function Home() {
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

      function onClearItems(){      
        console.log('Clean all items')
        window.contract.cleanItems(
          { }
        ).then(() => {          
            //do nothing 
            console.log('Done - Clean all items')
        });
      };
      function onClearBids(){      
        console.log('Clean all joiner bids')
        window.contract.cleanJoinerBids(
          {}
        ).then(() => {          
            //do nothing 
            console.log('Done - Clean all joiner bids')
        });
      };
    return (
        <main>
            <header>
                
                { window.currentUser
                ? <h3>Click to logout</h3>
                : <h3>Click to login</h3>
                }
                { window.currentUser
                ? <button onClick={signOut}>Log out</button>
                : <button onClick={signIn}>Log in</button>
                }
            </header>      
            <button type="button" onClick={onClearItems}>
                Clear all items
            </button>
            <button type="button" onClick={onClearBids}>
            Clear all Bids
            </button>
        </main> 
    );
}