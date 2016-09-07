const React = require('react')

class ActionButton extends React.Component {
  render () {
    return (
      <div>
        <button
          onClick={this.props.handleClick}
          className="ActionButton"
        >
          {this.props.text}
        </button>
      </div>
    )
  }
}

export default ActionButton
