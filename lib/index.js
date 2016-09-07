const $ = require('jquery');
const firebase = require('./firebase');
const style = require('./styles');
const Budget = require('./budget');
const React = require('react')
const ReactDOM = require('react-dom')
import SignIn from './components/SignIn'

ReactDOM.render(
  <SignIn />,
  document.getElementById('application')
)

var x = new Budget();
// x.signIn();
