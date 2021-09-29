import React from 'react';

export default function Home() {
    if (!window.currentUser) {
        window.location.href="/account";
    }
    return (
        <div>Contact</div>
    );
}