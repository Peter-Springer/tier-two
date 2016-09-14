import React from 'react';

module.exports = (props) => (
  <section className = 'log-purchase-form'>
    <p className="enter-label">Enter New Purchase Info:</p>
    <input
      className="add-purchase-date"
      type="date"
      placeholder="Date of purchase"
      onChange={props.getDateInput}
    />
    <input
      className="add-purchase-value"
      type="number"
      placeholder="Purchase Cost"
      onChange={props.getPurchaseInput}
    />
    <input
      className="add-purchase-description"
      type="text"
      placeholder="What did you buy?"
      onChange={props.getDescriptionInput}
    />
    <button
      className="submit-purchase-button"
      onClick={props.sendPurchaseToDatabase}>
      Submit Purchase
    </button>
  </section>
)
