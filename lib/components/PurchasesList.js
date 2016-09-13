
import React from 'react';
import Purchase from './Purchase';


class PurchasesList extends React.Component {


  render() {


    return (
      <section>

        <h2>
          Past Purchases
        </h2>

        <ul className="past-purchases" >
          {this.props.pastPurchases.map((p) => <Purchase purchase={p} key={p.key}/>)}
        </ul>
        <button
          onClick={this.props.goBackToBudget}
          className="back-to-home">
          Go Back to Budget
        </button>

      </section>
    )
  }
}

export default PurchasesList
