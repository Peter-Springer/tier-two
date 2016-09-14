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
      lastPurchaseDescription: null,
      dateInput: '',
      costInput: '',
      descriptionInput: '',
      startDate: null,
      endDate: null,
      daysLeft: null
    };

    this.getBudgetStartDate = () => {
      database.budgetStartDate.on('value', (snapshot) => {
        let budgetStartDate = snapshot.val();
        let startDate = budgetStartDate.start;
        this.setState({ startDate: startDate })
      })
    }

    this.getBudgetEndDate = () => {
      database.budgetEndDate.on('value', (snapshot) => {
        let budgetEndDate = snapshot.val();
        let endDate = budgetEndDate.end;
        this.setState({ endDate: endDate });
      })
    }

    this.getPurchaseInput = (event) => {
      let purchaseInput = event.target.value;
      this.setState({lastPurchase: +purchaseInput, costInput: purchaseInput});
    };

    this.getDateInput = (event) => {
      let dateInput = event.target.value;
      this.setState({lastPurchaseDate: dateInput,
                      dateInput: dateInput});
    };

    this.getDescriptionInput = (event) => {
      let purchaseDescription = event.target.value;
      this.setState({ lastPurchaseDescription: purchaseDescription,
                      descriptionInput: purchaseDescription });
    };

    this.sendPurchaseToDatabase = () => {
      const { lastPurchase, lastPurchaseDate, lastPurchaseDescription } = this.state;
      database.allPurchases.push({ date: lastPurchaseDate,
                                    price: lastPurchase,
                                    description: lastPurchaseDescription });
      this.updateRemainingBudget();
    };

    this.checkForRemainingBudget = () => {
     database.remainingBudget.on('value', (snapshot) => {
       let remainingBudget = snapshot.val();
       let budgetValue = +remainingBudget.text;
       this.setState({ remainingBudget: budgetValue });
     });
   };

   this.updateRemainingBudget = () => {
     const {remainingBudget, lastPurchase} = this.state;
     let newRemaining = remainingBudget - lastPurchase;
     this.state.remainingBudget = +newRemaining;
     this.sendRemainingBudgetToDatabase();
   };

   this.sendRemainingBudgetToDatabase = () => {
     const { remainingBudget } = this.state;
     database.remainingBudget.set({text: remainingBudget});
   };

   this.clearfields = () => {
     this.setState({ dateInput: '',
           costInput: '',
           descriptionInput: '' });
   };

   this.submitPurchase = () => {
     this.sendPurchaseToDatabase();
     this.clearfields();
    };
  }



  componentWillMount() {
    this.checkForRemainingBudget();
    this.getBudgetStartDate();
    this.getBudgetEndDate();
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
        endDate = {this.state.endDate}
        startDate = {this.state.startDate}
        />

      <button
         className="reset-budget-button"
         onClick={this.props.resetBudget}>
         Reset Budget
      </button>

      <LogPurchaseForm
        getDateInput = {this.getDateInput}
        getPurchaseInput = {this.getPurchaseInput}
        getDescriptionInput = {this.getDescriptionInput}
        submitPurchase = {this.submitPurchase}
        dateInput = {this.state.dateInput}
        costInput = {this.state.costInput}
        descriptionInput = {this.state.descriptionInput}
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
