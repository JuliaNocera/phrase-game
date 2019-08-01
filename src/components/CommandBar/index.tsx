import * as React from 'react'
import './index.css'

interface CommandBarProps {
  createNewGame: () => void
}

export default class CommandBar extends React.PureComponent<CommandBarProps> {
  handleCreateNewGame = () => {
    this.props.createNewGame()
  }

  render() {
    window.console.log('render')
    return (
      <button className="new-game-button" onClick={this.handleCreateNewGame}>
        New Game
      </button>
    )
  }
}
