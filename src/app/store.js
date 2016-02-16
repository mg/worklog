import { createStore, compose, applyMiddleware } from 'redux'
import sagaMiddleware from 'redux-saga'

import store from '../store'
import sagas from '../store/sagas'

export default function(extraMiddlewares, devTools) {
  return compose(
    applyMiddleware(sagaMiddleware(sagas)),
    ...extraMiddlewares.map(middleware => applyMiddleware(middleware)),
    devTools ? devTools.instrument() : f => f,
  )(createStore)(store)
}
