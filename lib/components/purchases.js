const firebase = require('../firebase');
import React from 'react';

class Purchases extends React.Component {

  render() {
    return (
      <section>

        <h2>
          Past Purchases
        </h2>

        <ul
          className="past-purchases">
        </ul>

      </section>
    )
  }


}

export default Purchases
