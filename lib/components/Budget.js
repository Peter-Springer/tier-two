const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
import React from 'react';


class Budget extends React.Component {
  constructor() {
    super();
    this.budgetInput = document.querySelector('.budget-input');
    this.userBudget = 'test';
  }


  get reference() {
    return database.ref(`${auth.currentUser.uid}/monthlyBudget`);
  }

  componentDidMount() {
  //${this.props.uid}=this.reference
  //'value' = onChange (ANY change). there are also specific ones. this says to CARE about changes
  this.reference.on('value', (snapshot) => {
    const budget = snapshot.val();
    let newBudgie = budget.text;
    console.log(newBudgie);//this is how we show the input screen!! :
    this.userBudget = newBudgie;
    });
  }

  saveBudget(){
    this.randomKey = database.ref(`${auth.currentUser.uid}/monthlyBudget`);
    // e.preventDefault();
// database().ref(`user-tasks/${this.props.uid}`);
    this.randomKey.set({text: document.querySelector('.budget-input').value});
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
    <h2> Your Monthly Budget: {this.userBudget}</h2>
    <br/>
    <button
    className="signOut"
    onClick={() => firebase.auth().signOut()}>
    Sign Out
    </button>
    </section>
  )
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
