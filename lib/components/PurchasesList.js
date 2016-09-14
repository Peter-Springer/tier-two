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

        <button
          onClick={this.props.goBackToBudget}
          className="back-to-home">
          Back to Budget
        </button>

        <h2>
          Past Purchases
        </h2>

        <ul className="past-purchases" >
          {this.state.purchases.map((p) => <Purchase purchase={p} key={p.key} />)}
        </ul>

      </section>
    )
  }
}

export default PurchasesList
