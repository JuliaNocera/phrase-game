import * as React from 'react'
import * as routes from '../../constants/routes'
import { auth } from '../../firebase'

interface IInterfaceProps {
  email?: string
  error?: any
  history?: any
  password?: string
}

interface IInterfaceState {
  email: string
  error: any
  password: string
}

export class SignInForm extends React.Component<
  IInterfaceProps,
  IInterfaceState
> {
  private static INITIAL_STATE = {
    email: '',
    error: null,
    password: ''
  }

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value }
  }

  constructor(props: IInterfaceProps) {
    super(props)

    this.state = { ...SignInForm.INITIAL_STATE }
  }

  public onSubmit = (event: any) => {
    const { email, password } = this.state

    const { history } = this.props

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...SignInForm.INITIAL_STATE }))
        history.push(routes.HOME)
      })
      .catch(error => {
        this.setState(SignInForm.propKey('error', error))
      })

    event.preventDefault()
  }

  public render() {
    const { email, password, error } = this.state

    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={this.setEmailState}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={this.setPassword}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }

  private setEmailState = (event: any) => {
    this.setStateWithEvent(event, 'email')
  }

  private setPassword = (event: any) => {
    this.setStateWithEvent(event, 'passwordOne')
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(SignInForm.propKey(columnType, (event.target as any).value))
  }
}
