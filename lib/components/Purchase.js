import React from 'react';
const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();

export default function Purchase({ purchase }) {

  return (
    <li className="list-items">
      <h3><span className="list-descriptions">Date:</span>
          {purchase.date}
          <span className="list-descriptions">Description:</span>
          {purchase.description} <span className="list-descriptions">Cost:</span>
          ${purchase.price}
        <button
          className="delete-button"
          onClick={() => database.ref(`${auth.currentUser.uid}/allPurchases/${purchase.key}`).remove()}
          > remove </button>
      </h3>
    </li>
  );
}
