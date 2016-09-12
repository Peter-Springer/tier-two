const firebase = require('../firebase');
import React from 'react';


class HomeScreen extends React.Component {

  render() {
    return (
    <section>
      <h1>You have:{this.props.remainingBudget}</h1>

     <h3> Out of: {this.props.userBudget} </h3>

      <input
        className="add-purchase-date"
        type="date"
        placeholder="Date of purchase"
        onChange={this.props.getDateInput}
      />

      <input
        className="add-purchase-value"
        type="number"
        placeholder="Add a purchase"
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
        Submit purchase
      </button>

    </section>
    )
  }
}

export default HomeScreen;
