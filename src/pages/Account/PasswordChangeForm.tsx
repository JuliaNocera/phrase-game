import * as React from 'react'
import { auth } from '../../firebase'

interface IInterfaceProps {
  error?: any
  history?: any
  passwordOne?: string
  passwordTwo?: string
}

interface IInterfaceState {
  error?: any
  passwordOne?: string
  passwordTwo?: string
}

export class PasswordChangeForm extends React.Component<
  IInterfaceProps,
  IInterfaceState
> {
  private static INITIAL_STATE = {
    error: null,
    passwordOne: '',
    passwordTwo: ''
  }

  private static propKey(propertyName: string, value: string): object {
    return { [propertyName]: value }
  }

  constructor(props: any) {
    super(props)
    this.state = { ...PasswordChangeForm.INITIAL_STATE }
  }

  public onSubmit = (event: any) => {
    const { passwordOne }: any = this.state

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...PasswordChangeForm.INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(PasswordChangeForm.propKey('error', error))
      })

    event.preventDefault()
  }

  public render() {
    const { passwordOne, passwordTwo, error }: any = this.state

    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={passwordOne}
          onChange={this.setPasswordOne}
          type="password"
          placeholder="New Password"
        />
        <input
          value={passwordTwo}
          onChange={this.setPasswordTwo}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
  private setPasswordOne = (event: any) => {
    this.setStateWithEvent(event, 'passwordOne')
  }

  private setPasswordTwo = (event: any) => {
    this.setStateWithEvent(event, 'passwordTwo')
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(
      PasswordChangeForm.propKey(columnType, (event.target as any).value)
    )
  }
}
