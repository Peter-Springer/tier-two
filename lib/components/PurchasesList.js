
import React from 'react';


class PurchasesList extends React.Component {


  render() {


    return (
      // let pastPurchaseList={this.props.pastPurchaseState}
      <section>

        <h2>
          Past Purchases
        </h2>

        <ul
          className="past-purchases" >
{        this.props.renderPastPurchases}

        </ul>
        <button
          className="back-to-home">
          Go Back to Budget
        </button>


      </section>
    )
  }
}

export default PurchasesList
