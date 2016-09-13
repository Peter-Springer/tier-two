const firebase = require('../firebase');
import React from 'react';


class HomeScreen extends React.Component {

  render() {
    return (
    <section>
      <p className="welcome">Welcome Back {this.props.getUserName}</p>
      <p className="you-have">You have:</p>
      <p className="big-budgy">${this.props.remainingBudget}</p>

      <p className="out-of">(Until ${this.props.userBudget})</p>

      <p className="enter-label">Enter New Purchase Info:</p>

      <input
        className="add-purchase-date"
        type="date"
        placeholder="Date of purchase"
        onChange={this.props.getDateInput}
      />

      <input
        className="add-purchase-value"
        type="number"
        placeholder="Purchase Cost"
        onChange={this.props.getPurchaseInput}
      />

      <input
        className="add-purchase-description"
        type="text"
        placeholder="What did you buy?"
        onChange={this.props.getDescriptionInput}
      />

      <button
        className="submit-purchase-button"
        onClick={this.props.sendPurchaseToDatabase}>
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
