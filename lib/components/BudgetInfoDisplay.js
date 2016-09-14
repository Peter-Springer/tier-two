import React from 'react';

module.exports = (props) => (
        <section className="budget-info-display">
          <p className="welcome">Welcome Back, {props.userDisplayName}</p>
          <p className="you-have">You have:</p>
          <p className="big-budgy">${props.remainingBudget}</p>
          <p className="you-have">Remaining</p>
          <p className="out-of">(Out Of: ${props.userBudget})</p>
        </section>
      )
