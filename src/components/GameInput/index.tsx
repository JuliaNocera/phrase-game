import * as React from 'react'

interface IGameInputProps {
  updateGameEntries: ({
    input,
    adding
  }: {
    input: string
    adding: boolean
  }) => void
}

interface GameInputState {
  value: string
}

export default class GameInput extends React.Component<
  IGameInputProps,
  GameInputState
> {
  constructor(props: IGameInputProps) {
    super(props)
    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleAddInput = () => {
    const { updateGameEntries } = this.props
    const val = this.state.value
    const sanitizedInput = val
    this.setState({ value: '' })
    updateGameEntries({ input: sanitizedInput, adding: true })
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event: any) {
    this.handleAddInput()
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Lettuce:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
