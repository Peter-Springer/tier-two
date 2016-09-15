import React from 'react';
const numeral = require('numeral');

module.exports = (props) => {

        let totalRemaining = numeral(props.remainingBudget).format('$0,0.00');
        let originalBudget = numeral(props.userBudget).format('$0,0.00');
        let daysLeft = props.endDate - props.startDate;
        let weeksLeft = daysLeft / 7;
        let daily = Math.round(props.remainingBudget / daysLeft);
        let weekly = Math.round(props.remainingBudget / weeksLeft);

        return(
        <section className="budget-info-display">
          <p className="welcome">Welcome Back, {props.userDisplayName}</p>
          <p className="you-have">You have</p>
          <p className="big-budgy">{totalRemaining}</p>
          <p className="on-beer">left to spend on beer this month.</p>
          <p className="daily-weekly">That comes out to about ${daily} per day and ${weekly} per week.</p>
        </section>
      )
    }
