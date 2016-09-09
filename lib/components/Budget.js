const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
import React from 'react';
import Purchases from './purchases'


class Budget extends React.Component {
  constructor() {
    super();
    this.budgetInput = document.querySelector('.budget-input');
    this.purchases = new Purchases();
    this.state = {
    userBudget: null,
    remainingBudget: null};
  }


  get monthlyBudgetReference() {
    return database.ref(`${auth.currentUser.uid}/monthlyBudget`);
  }

  componentDidMount() {
    this.monthlyBudgetReference.on('value', (snapshot) => {
    const budget = snapshot.val();
    let newBudgiePoo = parseInt(budget.text);
    this.setState({ userBudget: newBudgiePoo, });

    this.userRemainingBudgetReference.on('value', (snapshot) => {
    const remainingBudget = snapshot.val();
    let remainingBudgetInteger = parseInt(remainingBudget.text);
    this.setState({ remainingBudget: remainingBudgetInteger, });
    });
  });
 }

  get userRemainingBudgetReference() {
    return database.ref(`${auth.currentUser.uid}/remainingMonthlyBudget`);
  }

  saveBudget(){
    this.userRemainingBudgetRef = database.ref(`${auth.currentUser.uid}/remainingMonthlyBudget`);
    this.userMonthlyBudgetRef = database.ref(`${auth.currentUser.uid}/monthlyBudget`);
    this.userMonthlyBudgetRef.set({text: document.querySelector('.budget-input').value});
    this.userRemainingBudgetRef.set({text: document.querySelector('.budget-input').value});
  }


render () {
  if (this.state.userBudget === null) {
  return (
    <section>
    <p>How much do you want to spend on beer this month?</p>
    <input type="number" className = "budget-input" />
    <button
    className = "budget-submit"
    onClick={() => this.saveBudget()}
    >Submit Beerfunds
    </button>
    </section>
  )
  }
  if (this.state.userBudget !== null) {
    return (
    <section>
    <h2>Welcome back, {auth.currentUser.displayName}</h2>
    <h1> Remaining Funds: ${this.state.remainingBudget}</h1>
    <h2> Out of: ${this.state.userBudget}</h2>
    <button className="sign-out" onClick={() => firebase.auth().signOut()}>
    Sign Out
    </button>
    <input type="number" className="add-purchase-input"/>
    <button onClick={() => this.purchases.updateRemainingBudget()}>Add Last Purchase</button>
    </section>
  )
}
}

}
export default Budget;
