const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();
import SignInScreen from './SignInScreen';
import React from 'react';


class SetBudget extends React.Component {

  render() {
    return (
      <section>
        <h1
          className="welcome-title">
          Beer Funds
        </h1>

        <h2
          className="prompt">
          How much would you like to spend on beer this month?
        </h2>

        <input
          onChange={this.props.getBudget}
          className="set-new-budget"
          type="number"
          placeholder="Add monthly budget"
        />

        <button
          onClick={this.props.storeBudget}
          className="submit-budget-button">
          Submit Budget
        </button>

      </section>
    )
  }




}



export default SetBudget;
