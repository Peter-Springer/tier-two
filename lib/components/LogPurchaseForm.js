import React from 'react';

module.exports = (props) => {

    return(
      <section className = 'log-purchase-form'>
        <p className="enter-label">Enter New Purchase Info:</p>
        <input
          className="add-purchase-date"
          type="date"
          placeholder="Date of purchase"
          onChange={props.getDateInput}
          value = {props.dateInput}
        />
        <input
          className="add-purchase-value"
          type="number"
          placeholder="Purchase Cost"
          onChange={props.getPurchaseInput}
          value = {props.costInput}
        />
        <input
          className="add-purchase-description"
          type="text"
          placeholder="What did you buy?"
          onChange={props.getDescriptionInput}
          value = {props.descriptionInput}
        />
        <button
          className="submit-purchase-button"
          onClick={props.submitPurchase}>
          Submit Purchase
        </button>
      </section>
    )
}
