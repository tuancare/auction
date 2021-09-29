
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
      
        </main> 
    );
}