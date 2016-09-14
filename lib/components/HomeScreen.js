import firebase from '../firebase';
import database from '../references';
import React from 'react';


class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      remainingBudget: null,
      lastPurchase: null,
      lastPurchaseDate: null,
      lastPurchaseDescription: null
    }

    this.getPurchaseInput = (event) => {
      let purchaseInput = event.target.value;
      this.setState({lastPurchase: +purchaseInput});
    }

    this.getDateInput = (event) => {
      let dateInput = event.target.value;
      this.setState({lastPurchaseDate: dateInput});
    }

    this.getDescriptionInput = (event) => {
      let purchaseDescription = event.target.value;
      this.setState({lastPurchaseDescription: purchaseDescription});
    }

    this.sendPurchaseToDatabase = () => {
      const { lastPurchase, lastPurchaseDate, lastPurchaseDescription } = this.state;
      database.allPurchases.push({date: lastPurchaseDate, price: lastPurchase, description: lastPurchaseDescription});
      this.updateRemainingBudget();
    }

    this.checkForRemainingBudget = () => {
     database.remainingBudget.on('value', (snapshot) => {
       let remainingBudget = snapshot.val();
       let budgetValue = parseInt(remainingBudget.text);
       this.setState({ remainingBudget: budgetValue })
     });
   }

   this.updateRemainingBudget = () => {
     const {remainingBudget, lastPurchase} = this.state;
     let newRemaining = remainingBudget - lastPurchase;
     this.state.remainingBudget = newRemaining;
     this.sendRemainingBudgetToDatabase();
   }

   this.sendRemainingBudgetToDatabase = () => {
     const { remainingBudget } = this.state;
     database.remainingBudget.set({text: remainingBudget});
   }
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
      <p className="welcome">Welcome Back, {this.props.userDisplayName}</p>
      <p className="you-have">You have:</p>
      <p className="big-budgy">${this.state.remainingBudget}</p>
      <p className="you-have">Remaining</p>
      <p className="out-of">(Out Of: ${this.props.userBudget})</p>

      <p className="enter-label">Enter New Purchase Info:</p>

      <input
        className="add-purchase-date"
        type="date"
        placeholder="Date of purchase"
        onChange={this.getDateInput}
      />

      <input
        className="add-purchase-value"
        type="number"
        placeholder="Purchase Cost"
        onChange={this.getPurchaseInput}
      />

      <input
        className="add-purchase-description"
        type="text"
        placeholder="What did you buy?"
        onChange={this.getDescriptionInput}
      />

      <button
        className="submit-purchase-button"
        onClick={this.sendPurchaseToDatabase}>
        Submit Purchase
      </button>

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
