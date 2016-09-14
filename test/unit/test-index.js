const React = require('react');
const ReactDOM = require('react-dom');
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
     App.state.user = true;
     
     assert.equal(App.state.user, true);

  });
});
