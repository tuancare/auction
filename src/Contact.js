import React from 'react';

export default function Home() {
    if (!window.currentUser) {
        window.location.href="/account";
    }
    return (
        <div>
            <div>RULEs</div>
            <ul>
                <li>User join to bid on an item in the legal time.</li>
                <li>User will be charged fee 0,5N and 10% of base price.</li>
                <li>User can bid many times with the price higher base price.</li>
                <li>The highest bidder will be the winner after timeout.</li>
                <li>After 1 hour of bid period, if winner doesnot payout, he will lost his 10% pre-paid.</li>
                <li>The others that did not win will be refunded 10% pre-paid after that.</li>
            </ul>
        </div>
    );
}