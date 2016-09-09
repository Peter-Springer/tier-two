const $ = require('jquery');
const style = require('./styles/styles');
const React = require('react')
const ReactDOM = require('react-dom')
import Application from './components/Application'

ReactDOM.render(<Application />, document.getElementById('application'))
