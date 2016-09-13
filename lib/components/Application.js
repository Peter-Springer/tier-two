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
      dateOfFirstBudget: null,
      currentDate: null,
      remainingBudget: null,
      lastPurchase: null,
      lastPurchaseDate: null,
      lastPurchaseDescription: null,
      onPurchasePage: false,
      purchases: []
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
    this.addDateOfFirstBudgetToState = this.addDateOfFirstBudgetToState.bind(this);
    this.updateCurrentDate = this.updateCurrentDate.bind(this);
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

  //first budget stuff

  get dateOfFirstBudgetRef() {
    return database.ref(`${auth.currentUser.uid}/dateOfFirstBudget`)
  }

  getCurrentDate() {
    let newDate = new Date();
    return {month: newDate.getMonth(), day: newDate.getDate()}
  }

  addDateOfFirstBudgetToState() {
    let newDate = this.getCurrentDate()
    this.state.dateOfFirstBudget = { month: newDate.month, day: newDate.day }
    this.sendDateOfFirstBudgetToDatabase();
  }

  sendDateOfFirstBudgetToDatabase() {
    const { dateOfFirstBudget } = this.state;
    this.dateOfFirstBudgetRef.set({ month: dateOfFirstBudget.month, day: dateOfFirstBudget.day });
    debugger;
  }

  checkForDateOfFirstBudget() {
    this.dateOfFirstBudgetRef.on('value', (snapshot) => {
      let firstDate = snapshot.val();
      this.setState({ dateOfFirstBudget: {month: firstDate.month, day: firstDate.day} })
    })
  }

  updateCurrentDate() {
    let newDate = this.getCurrentDate();
    this.state.currentDate = {month: newDate.month, day: newDate.day}
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
     if (budgetValue) { this.setState({ storedBudget: true })}
     this.setState({ userBudget: budgetValue})
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
   this.checkForDateOfFirstBudget();
   this.updateCurrentDate();
 }


 getBudgetInput(event) {
   let userBudgetInput = event.target.value;
   this.setState({userBudget: +userBudgetInput});
 }

 sendBudgetToDatabase() {
   const { userBudget } = this.state;
   this.monthlyBudgetRef.set({text: userBudget });
   this.remainingBudgetRef.set({text: userBudget});
   this.setState({userBudget: userBudget, storedBudget: true, remainingBudget: userBudget});
   this.addDateOfFirstBudgetToState();
 }

 sendRemainingBudgetToDatabase() {
   const { remainingBudget } = this.state;
   this.remainingBudgetRef.set({text: remainingBudget});
 }

 getPurchaseInput(event) {
   debugger;
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
          getUserName={auth.currentUser.displayName}
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
