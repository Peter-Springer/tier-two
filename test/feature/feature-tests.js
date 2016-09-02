const assert = require('assert')

describe('welcome page', function(){
  it('should be able to grab the page title', function(){
    browser('/');
    var title = browser.getTitle()
    assert.equal(title, 'Budget App');
  });
});
