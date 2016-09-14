import firebase from '../firebase';
import database from '../references'
import SignInScreen from './SignInScreen';
import React from 'react';

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
      this.sendEndBudgetDateToDatabase();
    };

    this.getEndDate = () => {
      let newDate = new Date();
      let endDateMonth = newDate.getMonth();
      endDateMonth = endDateMonth + 2;
      return {month: endDateMonth, day: newDate.getDate()};
    };

    this.sendEndBudgetDateToDatabase = () => {
      let dateOfFirstBudget = this.getEndDate();
      database.dateBudgetEnds.set({ month: dateOfFirstBudget.month, day: dateOfFirstBudget.day });
    };
  }

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
          onChange={this.getBudgetInput}
          className="set-new-budget"
          type="number"
          placeholder="Add monthly budget"
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
