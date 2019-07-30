import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import config from '../my-env'

if (!firebase.apps.length) {
  window.console.log({ config })
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
export const db = firebase.database()
