import * as React from 'react'
import * as routes from '../../constants/routes'
import { auth, db } from '../../firebase'

interface IInterfaceProps {
  email?: string
  error?: any
  history?: any
  passwordOne?: string
  passwordTwo?: string
  username?: string
}

interface IInterfaceState {
  email: string
  error: any
  passwordOne: string
  passwordTwo: string
  username: string
}

export class SignUpForm extends React.Component<
  IInterfaceProps,
  IInterfaceState
> {
  private static INITIAL_STATE = {
    email: '',
    error: null,
    passwordOne: '',
    passwordTwo: '',
    username: ''
  }

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value }
  }

  constructor(props: IInterfaceProps) {
    super(props)
    this.state = { ...SignUpForm.INITIAL_STATE }
  }

  public onSubmit = (event: any) => {
    event.preventDefault()

    const { email, passwordOne, username } = this.state
    const { history } = this.props

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: any) => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState({ ...SignUpForm.INITIAL_STATE })
            history.push(routes.HOME)
          })
          .catch(error => {
            this.setState(SignUpForm.propKey('error', error))
          })
      })
      .catch(error => {
        this.setState(SignUpForm.propKey('error', error))
      })
  }

  public render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={this.setUsernameState}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={this.setEmailState}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={this.setPasswordOne}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={this.setPasswordTwo}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }

  private setUsernameState = (event: any) => {
    this.setStateWithEvent(event, 'username')
  }

  private setEmailState = (event: any) => {
    this.setStateWithEvent(event, 'email')
  }

  private setPasswordOne = (event: any) => {
    this.setStateWithEvent(event, 'passwordOne')
  }

  private setPasswordTwo = (event: any) => {
    this.setStateWithEvent(event, 'passwordTwo')
  }

  private setStateWithEvent(event: any, columnType: string) {
    this.setState(SignUpForm.propKey(columnType, (event.target as any).value))
  }
}
