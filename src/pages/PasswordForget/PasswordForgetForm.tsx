import * as React from 'react'
import { auth } from '../../firebase'

export class PasswordForgetForm extends React.Component {
  private static INITIAL_STATE = {
    email: '',
    error: null
  }

  private static propKey(propertyName: string, value: string) {
    return { [propertyName]: value }
  }

  constructor(props: any) {
    super(props)

    this.state = { ...PasswordForgetForm.INITIAL_STATE }
  }

  public onSubmit = (event: any) => {
    const { email }: any = this.state

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...PasswordForgetForm.INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(PasswordForgetForm.propKey('error', error))
      })

    event.preventDefault()
  }

  public render() {
    const { email, error }: any = this.state
    const isInvalid = email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={this.setEmailState}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }

  private setEmailState = (event: any) => {
    this.setStateWithEvent(event, 'email')
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(
      PasswordForgetForm.propKey(columnType, (event.target as any).value)
    )
  }
}
