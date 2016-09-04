const assert =  require('assert')
// require('../../public/index.html')

describe('welcome page', function(){
  it('should be able to grab the page title', function(){
    browser.url('/public');
    var title = browser.getTitle()
    assert.equal(title, 'Budget App');
  });
});
