const React = require('react')

class LoginButton extends React.Component {
  render () {
    return (
        <button onClick={this.props.handleClick} className="LoginButton">
          {this.props.text}
        </button>
    )
  }
}

export default LoginButton
