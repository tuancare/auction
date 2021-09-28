import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function Form({ onSubmit, currentUser,TransferN }) {
  return (
    <div>
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Welcome to Auction Gen-3 world, { currentUser.accountId }!</p>
        <p className="highlight">
          <label htmlFor="message">Message:</label>
          <input
            autoComplete="off"
            autoFocus
            id="message"
            required
          />
        </p>
        <p>
          <label htmlFor="donation">Donation (optional):</label>
          <input
            autoComplete="off"
            defaultValue={'0'}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>
        <button type="submit">
          Sign
        </button>
      </fieldset>
      <div>aaa
      <input id="transfer_acc" type="text"/>
      <input autoComplete="off" defaultValue={'0'} id="transfer_num" max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number"
          />
      <button onClick={TransferN} >
      Transfer
        </button>
      </div>
    </form>
    </div>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  TransferN: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};
