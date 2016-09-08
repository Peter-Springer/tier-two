const firebase = require('../firebase');
import React from 'react';


class Budget extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
      <section>
      <button className="signOut" onClick={() => firebase.auth().signOut()}>
  Sign Out
</button>
      <h1>hello</h1>
      </section>
    )
  }


}

export default Budget;
