import { take, put, fork } from 'redux-saga'

import { internal } from './actions.js'

export default function(name, api) {
  let actions= internal(name)

  const CREATE= `CREATE_${name}`
  const SAVE= `SAVE_${name}`
  const REMOVE= `REMOVE_${name}`

  function* create() {
    while(true) {
      const { payload }= yield take(CREATE)
      let key

      try {
        let action= actions.creating(payload)
        yield put(action)
        key= action.key
        const response= yield api.create(payload)
        yield put(actions.created(payload, key))
      } catch(error) {
        yield put(actions.errorCreating(error, key))
      }
    }
  }

  function* save() {
    while(true) {
      const { payload }= yield take(SAVE)
      let key

      try {
        let action= actions.saving(payload)
        yield put(action)
        key= action.key
        const response= yield api.save(payload)
        yield put(actions.saved(payload, key))
      } catch(error) {
        yield put(actions.errorSaving(error, key))
      }
    }
  }

  function* remove() {
    while(true) {
      const { payload }= yield take(REMOVE)
      let key

      try {
        let action= actions.removing(payload)
        yield put(action)
        key= action.key
        const response= yield api.remove(payload)
        yield put(actions.removed(payload, key))
      } catch(error) {
        yield put(actions.errorRemoving(error, key))
      }
    }
  }

  return function* (getState) {
    yield [
      fork(create),
      fork(save),
      fork(remove),
    ]
  }
}
