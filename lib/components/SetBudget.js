const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();
import SignInScreen from './SignInScreen';
import React from 'react';


class SetBudget extends React.Component {

  render() {
    return (
      <section>
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
