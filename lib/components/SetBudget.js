import firebase from '../firebase';
import database from '../references'
import SignInScreen from './SignInScreen';
import React from 'react';


class SetBudget extends React.Component {

  constructor() {
    super();
    this.state = {
      userBudget: null
    }

    this.getBudgetInput = (event) => {
      let userBudgetInput = event.target.value;
      this.state.userBudget = +userBudgetInput;
    }

    this.sendBudgetToDatabase = () => {
      const { userBudget } = this.state;
      database.monthlyBudget.set({text: userBudget });
      database.remainingBudget.set({text: userBudget});
      this.setState({userBudget: userBudget, storedBudget: true, remainingBudget: userBudget});
      this.sendDateBudgetWasSetToDatabase();
    }

    //set budget date stuff

    this.getCurrentDate = () => {
      let newDate = new Date();
      return {month: newDate.getMonth(), day: newDate.getDate()}
    }

    this.sendDateBudgetWasSetToDatabase = () => {
      let dateOfFirstBudget = this.getCurrentDate();
      database.dateBudgetWasSet.set({ month: dateOfFirstBudget.month, day: dateOfFirstBudget.day });
    }

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
