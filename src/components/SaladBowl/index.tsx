import * as React from 'react'

interface SaladBowlProps {
  entries: string[]
}

interface SaladBowlState {
  showEntries: boolean
  selectedEntry: string
}

export default class SaladBowl extends React.Component<
  SaladBowlProps,
  SaladBowlState
> {
  state = {
    selectedEntry: '',
    showEntries: false
  }

  toggleEntries = (e: any) => {
    e.preventDefault()
    this.setState(({ showEntries }) => ({
      showEntries: !showEntries
    }))
  }

  getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  selectRandomEntry = (e: any) => {
    e.preventDefault()
    const randomIndex = this.getRandomInt(this.props.entries.length || 0)
    const selectedEntry = this.props.entries[randomIndex]
    window.console.log({ selectedEntry })
    this.setState({ selectedEntry })
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.entries && this.state.showEntries && (
          <div>No entries add yet</div>
        )}
        {<div>{this.props.entries.length || 0} entries</div>}
        <button onClick={this.toggleEntries}>
          {this.state.showEntries ? 'Hide Entries' : 'ShowEntries'}
        </button>
        <button onClick={this.selectRandomEntry}>Select Entry</button>
        {this.state.selectedEntry && (
          <div> Selected Entry: {this.state.selectedEntry}</div>
        )}
        {this.props.entries && this.state.showEntries && (
          <ul>
            {this.props.entries.map((entry, index) => {
              return <li key={`${entry}-${index}`}>{entry}</li>
            })}
          </ul>
        )}
      </React.Fragment>
    )
  }
}
