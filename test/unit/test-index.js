import React from 'react';
import Application from '../../lib/components/Application';
const assert = require('chai').assert;

describe('our test bundle', function() {
  it('should work', function() {
    assert.equal(true, true);
  });
});

describe('application file', function() {
  it('be able to change "on purchase page" status', function(){

    let App = new Application();
    // App.mount();
    App.setState({ onPurchasePage: true });

    assert.equal(App.state.onPurchasePage, true);

  });
});
