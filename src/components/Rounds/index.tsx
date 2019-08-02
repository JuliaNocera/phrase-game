import * as React from 'react'

interface RoundsProps {
  startRound: () => void
  hasMinEntryCount: boolean
}
interface RoundsState {
  currentRound: number
}

export default class Rounds extends React.Component<RoundsProps, RoundsState> {
  // STYLE Rounds for active states
  state = {
    currentRound: 0
  }

  handleClick = () => {
    this.setState(({ currentRound }) => {
      return { currentRound: currentRound + 1 <= 3 ? currentRound + 1 : 1 }
    }, this.props.startRound)
  }

  render() {
    const styleProps = {
      border: '2px solid grey',
      padding: '0px 5px',
      margin: '0px 5px'
    }

    console.log('hasMinCount:', this.props.hasMinEntryCount)

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: '10px 20px'
        }}
      >
        <button
          disabled={!this.props.hasMinEntryCount}
          style={{ margin: '0px 5px' }}
          onClick={this.handleClick}
        >
          Start Round
        </button>
        <div
          style={{
            ...styleProps,
            background: this.state.currentRound === 1 ? 'red' : 'transparent'
          }}
        >
          1
        </div>
        <div
          style={{
            ...styleProps,
            background: this.state.currentRound === 2 ? 'red' : 'transparent'
          }}
        >
          2
        </div>
        <div
          style={{
            ...styleProps,
            background: this.state.currentRound === 3 ? 'red' : 'transparent'
          }}
        >
          3
        </div>
      </div>
    )
  }
}
