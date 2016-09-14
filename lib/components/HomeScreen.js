import firebase from '../firebase';
import database from '../references';
import React from 'react';
import BudgetDisplay from './BudgetInfoDisplay.js';
import LogPurchaseForm from './LogPurchaseForm.js';

class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      remainingBudget: null,
      lastPurchase: null,
      lastPurchaseDate: null,
      lastPurchaseDescription: null
    };

    this.getPurchaseInput = (event) => {
      let purchaseInput = event.target.value;
      this.setState({lastPurchase: +purchaseInput});
    };

    this.getDateInput = (event) => {
      let dateInput = event.target.value;
      this.setState({lastPurchaseDate: dateInput});
    };

    this.getDescriptionInput = (event) => {
      let purchaseDescription = event.target.value;
      this.setState({lastPurchaseDescription: purchaseDescription});
    };

    this.sendPurchaseToDatabase = () => {
      const { lastPurchase, lastPurchaseDate, lastPurchaseDescription } = this.state;
      database.allPurchases.push({date: lastPurchaseDate, price: lastPurchase, description: lastPurchaseDescription});
      this.updateRemainingBudget();
    };

    this.checkForRemainingBudget = () => {
     database.remainingBudget.on('value', (snapshot) => {
       let remainingBudget = snapshot.val();
       let budgetValue = parseInt(remainingBudget.text);
       this.setState({ remainingBudget: budgetValue });
     });
   };

   this.updateRemainingBudget = () => {
     const {remainingBudget, lastPurchase} = this.state;
     let newRemaining = remainingBudget - lastPurchase;
     this.state.remainingBudget = newRemaining;
     this.sendRemainingBudgetToDatabase();
   };

   this.sendRemainingBudgetToDatabase = () => {
     const { remainingBudget } = this.state;
     database.remainingBudget.set({text: remainingBudget});
   };
  }

  componentWillMount() {
    this.checkForRemainingBudget();
  }

  componentWillUnmount() {
    database.allPurchases.off();
    database.remainingBudget.off();
  }

  render() {
    return (
    <section>
      <BudgetDisplay
        userDisplayName = {this.props.userDisplayName}
        remainingBudget = {this.state.remainingBudget}
        userBudget = {this.props.userBudget}
      />

      <LogPurchaseForm
        getDateInput = {this.getDateInput}
        getPurchaseInput = {this.getPurchaseInput}
        getDescriptionInput = {this.getDescriptionInput}
        sendPurchaseToDatabase = {this.sendPurchaseToDatabase}
      />

      <a
        className="view-past-purchases"
        onClick={this.props.goToPurchasesComponent}>
        View Past Purchases
      </a>

    </section>
    )
  }
}

export default HomeScreen;
