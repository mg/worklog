import { fork } from 'redux-saga'
import { sagas as projectSagas } from './project.js'

export default function*(state) {
  yield [
    fork(projectSagas, state),
  ]
}
