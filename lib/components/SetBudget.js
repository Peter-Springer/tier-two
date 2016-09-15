import firebase from '../firebase';
import database from '../references';
import SignInScreen from './SignInScreen';
import React from 'react';
import moment from 'moment';

class SetBudget extends React.Component {

  constructor() {
    super();
    this.state = {
      userBudget: null
    };

    this.getBudgetInput = (event) => {
      let userBudgetInput = event.target.value;
      this.state.userBudget = +userBudgetInput;
    };

    this.sendBudgetToDatabase = () => {
      const { userBudget } = this.state;
      database.monthlyBudget.set({text: userBudget });
      database.remainingBudget.set({text: userBudget});
      this.setState({userBudget: userBudget, storedBudget: true, remainingBudget: userBudget});
      this.sendBudgetDatesToDatabase();
    };

    this.sendBudgetDatesToDatabase = () => {
      let startDate = moment().dayOfYear();
      let end =  moment().add(1, 'months');
      let endDate = moment(end).dayOfYear();
      database.budgetStartDate.set({ start: startDate });
      database.budgetEndDate.set({ end: endDate });
    };
  }

  render() {
    return (
      <section className="set-budget-wrapper">
        <h1
          className="welcome-title-budget">
          Beer Funds
        </h1>

        <h2
          className="prompt">
          How much would you like to spend on beer this month?
        </h2>

        <input
          onChange={this.getBudgetInput}
          className="set-new-budget"
          type="number"
          placeholder="Add budget"
        />

        <button
          onClick={this.sendBudgetToDatabase}
          className="submit-budget-button">
          Submit Budget
        </button>
      </section>
    )
  }
}

export default SetBudget;
