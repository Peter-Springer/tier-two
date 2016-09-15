import React from 'react';
const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();
const numeral = require('numeral');


export default function Purchase({ purchase }) {

  let price = numeral(purchase.price).format('$0,0.00');

  return (
    <li className="list-items">
      <h3 className="purchases"><span className="list-descriptions">Date: </span>
          {purchase.date}
          <span className="list-descriptions"> Description: </span>
          {purchase.description} <span className="list-descriptions"> Cost: </span>
          {price}
        <button
          className="delete-button"
          onClick={() => database.ref(`${auth.currentUser.uid}/allPurchases/${purchase.key}`).remove()}
          > remove </button>
      </h3>
    </li>
  );
}
