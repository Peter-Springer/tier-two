const firebase = require('../firebase');
import React from 'react';


class HomeScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
    <section>
      <h1>You have:{this.props.remainingBudget}</h1>
      <h3> Out of: {this.props.userBudget} </h3>
      <input
      className="add-purchase-value"
      type="number"
      placeholder="Add a purchase"
      onChange={this.props.getPurchaseInput}
      />
      <button
      className="submit-purchase-button"
      onClick={this.props.sendPurchaseToDatabase}
      >
      Submit purchase
      </button>
    </section>
    )
  }
}

export default HomeScreen;
