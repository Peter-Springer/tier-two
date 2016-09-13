const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();
import React from 'react';
import SignInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';
import SetBudget from './SetBudget';
import PurchasesList from './PurchasesList';
const _  = require('lodash');

class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      user: false,
      userBudget: null,
      storedBudget: false,
      remainingBudget: null,
      lastPurchase: null,
      lastPurchaseDate: null,
      lastPurchaseDescription: null,
      onPurchasePage: false,
      purchases: [],
      dateOfFirstBudget: null
    };

    this.signIn = this.signIn.bind(this);
    this.getBudgetInput = this.getBudgetInput.bind(this);
    this.sendBudgetToDatabase = this.sendBudgetToDatabase.bind(this);
    this.getPurchaseInput = this.getPurchaseInput.bind(this);
    this.getDateInput = this.getDateInput.bind(this);
    this.getDescriptionInput = this.getDescriptionInput.bind(this);
    this.sendPurchaseToDatabase = this.sendPurchaseToDatabase.bind(this);
    this.goToPurchasesComponent = this.goToPurchasesComponent.bind(this);
    this.getPastPurchases = this.getPastPurchases.bind(this);
    this.setDateOfFirstBudget = this.setDateOfFirstBudget.bind(this);
  }

  get allPurchasesRef() {
  return database.ref(`${auth.currentUser.uid}/allPurchases`);
}

  get monthlyBudgetRef() {
  return database.ref(`${auth.currentUser.uid}/monthlyBudget`);
}

  get remainingBudgetRef() {
  return database.ref(`${auth.currentUser.uid}/remainingBudget`);
}

  get dateOfFirstBudgetRef() {
    return database.ref(`${auth.currentUser.uid}/dateOfFirstBudget`)
  }

  getPastPurchases() {
    this.allPurchasesRef.on('value', (snapshot) => {
      const purchaseList = snapshot.val();

      if (!purchaseList) { return this.setState({ purchases: [] }); }

      this.setState({purchases: _.map(purchaseList, (value, key) => _.extend(value, { key }) )});
    });
  }

  checkForUser() {
   auth.onAuthStateChanged((user) => {
     this.state.user = true;
   });
 }

  setDateOfFirstBudget() {
    let newDate = new Date();
    this.setState({ dateOfFirstBudget: newDate })
    this.dateOfFirstBudgetRef.set({text: newDate})
  }

  updateRemainingBudget() {
    const {remainingBudget, lastPurchase} = this.state;
    let newRemaining = remainingBudget - lastPurchase;
    this.state.remainingBudget = newRemaining;
    this.sendRemainingBudgetToDatabase();
  }

  checkForBudget() {
   this.monthlyBudgetRef.on('value', (snapshot) => {
     let budget = snapshot.val();
     let budgetValue = parseInt(budget.text);
     this.setState({ userBudget: budgetValue, storedBudget: true})
   });
 }

 checkForRemainingBudget() {
  this.remainingBudgetRef.on('value', (snapshot) => {
    let budget = snapshot.val();
    let budgetValue = parseInt(budget.text);
    this.setState({ remainingBudget: budgetValue })
  });
}

 signIn() {
   let google = new firebase.auth.GoogleAuthProvider();
   auth.signInWithPopup(google);
   this.setState ({user: true});
   this.checkForUser();
   this.checkForBudget();
   this.checkForRemainingBudget();
 }

 getBudgetInput(event) {
   let userBudgetInput = event.target.value;
   this.setState({userBudget: +userBudgetInput});
 }

 sendBudgetToDatabase() {
   const { userBudget } = this.state;
   this.setDateOfFirstBudget();
   this.monthlyBudgetRef.set({text: userBudget });
   this.remainingBudgetRef.set({text: userBudget});
   this.setState({userBudget: userBudget, storedBudget: true, remainingBudget: userBudget});
 }

 sendRemainingBudgetToDatabase() {
   const { remainingBudget } = this.state;
   this.remainingBudgetRef.set({text: remainingBudget});
 }

 getPurchaseInput(event) {
   let purchaseInput = event.target.value;
   this.setState({lastPurchase: +purchaseInput});
 }

 getDateInput(event) {
   let dateInput = event.target.value;
   this.setState({lastPurchaseDate: dateInput});
 }

 getDescriptionInput(event) {
   let purchaseDescription = event.target.value;
   this.setState({lastPurchaseDescription: purchaseDescription});
 }

 sendPurchaseToDatabase() {
   const { lastPurchase, lastPurchaseDate, lastPurchaseDescription } = this.state;
   this.allPurchasesRef.push({date: lastPurchaseDate, price: lastPurchase, description: lastPurchaseDescription});
   this.updateRemainingBudget();
 }

 goToPurchasesComponent() {
   this.setState({ onPurchasePage: true });
   this.getPastPurchases();
 }

  render() {

    if (this.state.onPurchasePage) {
      return (
      <PurchasesList
        pastPurchases={this.state.purchases}
        goBackToBudget={() => this.setState({ onPurchasePage: false })}
      />
      )
    }

    if (this.state.storedBudget) {
      return (
        <HomeScreen
          remainingBudget={this.state.remainingBudget}
          userBudget={this.state.userBudget}
          getDateInput={this.getDateInput}
          getPurchaseInput={this.getPurchaseInput}
          getDescriptionInput={this.getDescriptionInput}
          sendPurchaseToDatabase={this.sendPurchaseToDatabase}
          goToPurchasesComponent={this.goToPurchasesComponent}
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
