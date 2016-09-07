const React = require('react')
const ReactDOM = require('react-dom')

class ActionButton extends React.Component {
  render () {
    return (
      <div>
        <button className="ActionButton">
          <span>{this.props.text}</span>
        </button>
      </div>
    )
  }
}

class LikesCounter extends React.Component {
  render () {
    return (
      <div>
        <h3>Likes: 0</h3>
        <div>
          <ActionButton text="Like! (+1)" />
        </div>
        <div>
          <ActionButton text="Dislike! (-1)" />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<LikesCounter />, document.getElementById('application'))
