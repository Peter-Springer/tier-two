import React from 'react';
const numeral = require('numeral');

module.exports = (props) => {

        let display = numeral(props.remainingBudget).format('$0,0.00');
        let total = numeral(props.userBudget).format('$0,0.00');

        return(
        <section className="budget-info-display">
          <p className="welcome">Welcome Back, {props.userDisplayName}</p>
          <p className="you-have">You have:</p>
          <p className="big-budgy">{display}</p>
          <p className="out-of">(Out Of: {total})</p>
          <p className="you-have">Until {props.endDateMonth}/{props.endDateDay}</p>
        </section>
      )
    }
