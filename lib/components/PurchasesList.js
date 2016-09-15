import React from 'react';
import Purchase from './Purchase';
import database from '../references';

class PurchasesList extends React.Component {
  constructor() {
    super();
    this.state = {
      purchases: []
    };
  }

  componentDidMount() {
    database.allPurchases.on('value', (snapshot) => {
      const purchaseList = snapshot.val();

      if (!purchaseList) { return this.setState({ purchases: [] }); }

      this.setState({purchases: _.map(purchaseList, (value, key) => _.extend(value, { key }) )});
    });
  }

  componentWillUnmount() {
    database.allPurchases.off();
  }

  render() {
    return (
      <section>
        <article className="purchase-wrapper">
          <h2 className="purchases-header">
            Past Purchases
          </h2>

          <button
            onClick={this.props.goBackToBudget}
            className="back-to-home">
            Back
          </button>

          <article className="list-items-wrapper">
            <ul className="past-purchases" >
              {this.state.purchases.map((p) => <Purchase purchase={p} key={p.key} />)}
            </ul>
          </article>
        </article>
      </section>
    )
  }
}

export default PurchasesList
