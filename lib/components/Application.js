const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();
import React from 'react'
import SignInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';
import SetBudget from './SetBudget';

class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      user: false,
      userBudget: null,
      storedBudget: false,
      remainingBudget: null,
      lastPurchase: null
    }
    this.signIn = this.signIn.bind(this)
    this.getBudgetInput = this.getBudgetInput.bind(this)
    this.sendBudgetToDatabase = this.sendBudgetToDatabase.bind(this)
    this.getPurchaseInput = this.getPurchaseInput.bind(this)
    this.sendPurchaseToDatabase = this.sendPurchaseToDatabase.bind(this)
  }


  get monthlyBudgetRef() {
    return database.ref(`${auth.currentUser.uid}/monthlyBudget`);
  };

  get remainingBudgetRef() {
    return database.ref(`${auth.currentUser.uid}/remainingBudget`);
  }

  checkForUser() {
   auth.onAuthStateChanged((user) => {
     this.state.user = true;
   });
 }

  updateRemainingBudget() {
    let remaining = this.state.remainingBudget
    let lastPurchase = this.state.lastPurchase
    remaining = remaining - lastPurchase;
    this.state.remainingBudget = remaining;
    this.sendRemainingBudgetToDatabase();
  }

  checkForBudget() {
   this.monthlyBudgetRef.on('value', (snapshot) => {
     let budget = snapshot.val();
     let budgetValue = parseInt(budget.text);
     this.state.userBudget = budgetValue;
     this.state.storedBudget = true ;
   })

 }

 checkForRemainingBudget() {
  this.remainingBudgetRef.on('value', (snapshot) => {
    let budget = snapshot.val();
    let budgetValue = parseInt(budget.text);
    this.setState({ remainingBudget: budgetValue })
  })

}

 signIn() {
   let google = new firebase.auth.GoogleAuthProvider()
   auth.signInWithPopup(google);
   this.setState ({user: true});
   this.checkForUser();
   this.checkForBudget();
   this.checkForRemainingBudget();
 }


 getBudgetInput(event) {
   let userBudgetInput = event.target.value;
   this.setState({userBudget: +userBudgetInput})
 }

 sendBudgetToDatabase() {
   const { userBudget } = this.state
   let monthlyBudgetRef = database.ref(`${auth.currentUser.uid}/monthlyBudget`)
   let monthlyRemainingBudget = database.ref(`${auth.currentUser.uid}/remainingBudget`)
   monthlyBudgetRef.set({text: userBudget })
   monthlyRemainingBudget.set({text: userBudget})
   this.setState({userBudget: userBudget, storedBudget: true, remainingBudget: userBudget})
 }

 sendRemainingBudgetToDatabase() {
   const { remainingBudget } = this.state;
   let remainingBudgetRef = database.ref(`${auth.currentUser.uid}/remainingBudget`);
   remainingBudgetRef.set({text: remainingBudget})
 }

 getPurchaseInput(event) {
   let purchaseInput = event.target.value;
   this.setState({lastPurchase: +purchaseInput})
 }

 sendPurchaseToDatabase() {
   const { lastPurchase } = this.state;
   let lastPurchaseRef = database.ref(`${auth.currentUser.uid}/lastPurchase`);
   lastPurchaseRef.set({text: lastPurchase})
   this.updateRemainingBudget();
 }

  render() {
    if (this.state.storedBudget) {
      return (
        <HomeScreen
        remainingBudget={this.state.remainingBudget}
        userBudget={this.state.userBudget}
        getPurchaseInput={this.getPurchaseInput}
        sendPurchaseToDatabase={this.sendPurchaseToDatabase}
        />
      )
    }
    if (this.state.user) {
      return (
       <SetBudget
        getBudget={this.getBudgetInput}
        storeBudget={this.sendBudgetToDatabase}
        />
      )
     }
     else {
       return (
         <SignInScreen
           signIn={this.signIn}
          />
       )
     }
  }

}


export default Application;
