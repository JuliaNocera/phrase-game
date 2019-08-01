import * as React from 'react'
import './App.css'

import CommandBar from 'src/components/CommandBar'
import GameInput from 'src/components/GameInput'
import SaladBowl from 'src/components/SaladBowl'

type Game = string
type Entry = string

interface AppProps {
  [key: string]: any
}

interface AppState {
  games: Game[]
  entries: Entry[]
}

export default class App extends React.Component<AppProps, AppState> {
  // createGameId = () => {

  // }
  state = {
    games: [] as Game[],
    entries: [] as Entry[]
  }

  onCreateNewGame = () => {
    this.setState(currentState => {
      const newGames = { games: ['a'] }
      return Object.assign(currentState, newGames)
    })
  }

  updateGameEntries = ({
    input,
    adding
  }: {
    input: string
    adding: boolean
  }) => {
    this.setState(currentState => {
      const newEntries = adding
        ? currentState.entries.concat([input])
        : currentState.entries
      return { entries: newEntries }
    })
  }

  public render() {
    window.console.log({ state: this.state })
    return (
      <div className="App">
        <header className="App-header">
          <CommandBar createNewGame={this.onCreateNewGame} />
        </header>
        <div className="App-body">
          <GameInput updateGameEntries={this.updateGameEntries} />
          <SaladBowl entries={this.state.entries} />
        </div>
      </div>
    )
  }
}
