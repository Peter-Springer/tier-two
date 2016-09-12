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
    this.renderPastPurchases = this.renderPastPurchases.bind(this);

  }

  get allPurchasesReference() {
  return database.ref(`${auth.currentUser.uid}/allPurchases`);
}

  getPastPurchases() {
    this.allPurchasesReference.on('value', (snapshot) => {
      const purchaseList = snapshot.val();

      if (!purchaseList) { return this.setState({ purchases: [] }); }

      this.setState({purchases: _.map(purchaseList, (value, key) => _.extend(value, { key }) )});
      console.log(this.state.purchases);
    });
  }

  get monthlyBudgetRef() {
    return database.ref(`${auth.currentUser.uid}/monthlyBudget`);
  }

  get remainingBudgetRef() {
    return database.ref(`${auth.currentUser.uid}/remainingBudget`);
  }

  renderPastPurchases() {
    // for (var i=0; i<array.length; i++) {
      return '<h1>hi</h1>';


  }

  checkForUser() {
   auth.onAuthStateChanged((user) => {
     this.state.user = true;
   });
 }

  updateRemainingBudget() {
    let remaining = this.state.remainingBudget;
    let lastPurchase = this.state.lastPurchase;
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
   let monthlyBudgetRef = database.ref(`${auth.currentUser.uid}/monthlyBudget`);
   let monthlyRemainingBudget = database.ref(`${auth.currentUser.uid}/remainingBudget`);
   monthlyBudgetRef.set({text: userBudget });
   monthlyRemainingBudget.set({text: userBudget});
   this.setState({userBudget: userBudget, storedBudget: true, remainingBudget: userBudget});
 }

 sendRemainingBudgetToDatabase() {
   const { remainingBudget } = this.state;
   let remainingBudgetRef = database.ref(`${auth.currentUser.uid}/remainingBudget`);
   remainingBudgetRef.set({text: remainingBudget});
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
  //  let lastPurchaseRef = database.ref(`${auth.currentUser.uid}/lastPurchase`);
   let allPurchaseRef = database.ref(`${auth.currentUser.uid}/allPurchases`);
  //  lastPurchaseRef.set({text: lastPurchase});
   allPurchaseRef.push({date: lastPurchaseDate, price: lastPurchase, description: lastPurchaseDescription});
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
