const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
import React from 'react';


class Budget extends React.Component {
  constructor() {
    super();
    this.budgetInput = document.querySelector('.budget-input');
  }

  render () {
    return (
      <section>
      <h1>hello</h1>
      <p>How much do you want to spend on beer this month?</p>
      <input className = "budget-input" />
      <button
        className = "budget-submit"
        onClick={() => this.saveBudget()}
        >Submit Beerfunds
        </button>
      <br/>
      <button
        className="signOut"
        onClick={() => firebase.auth().signOut()}>
        Sign Out
      </button>
      </section>
    )
  }

  saveBudget(){
    this.randomKey = database.ref();
    // e.preventDefault();

    this.randomKey.push({text: document.querySelector('.budget-input').value});
  }
}



export default Budget;


//userData ={
// budget: 300

//}

//if(budget)
// {go to the inside of the app}
// if(!budget)
// {show the budget entry field}
