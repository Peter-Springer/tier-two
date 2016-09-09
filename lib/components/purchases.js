const firebase = require('../firebase');
import React from 'react'
import Budget from './Budget';
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

class Purchases extends React.Component {
  constructor(){
    super();
  }

  addLastPurchase() {
    this.lastPurchaseRef = database.ref(`${auth.currentUser.uid}/lastPurchaseAmount`);
    this.lastPurchaseRef.set({text: document.querySelector('.add-purchase-input').value});
  }

  updateRemainingBudget() {
    
    this.addLastPurchase();

    let remainingBudget;
    let lastPurchase;

    this.remainingBudgetRef = database.ref(`${auth.currentUser.uid}/remainingMonthlyBudget`);
    this.remainingBudgetRef.on('value', (snapshot) => {
      let remainingBudgetObject = snapshot.val();
      remainingBudget = parseInt(remainingBudgetObject.text)
    });

    this.lastPurchaseRef = database.ref(`${auth.currentUser.uid}/lastPurchaseAmount`);
    this.lastPurchaseRef.on('value', (snapshot) => {
      let lastPurchaseObject = snapshot.val();
      lastPurchase = lastPurchaseObject.text;
    });

    remainingBudget = remainingBudget - lastPurchase;

    this.remainingBudgetRef.set({text: remainingBudget});
}

}


export default Purchases;
