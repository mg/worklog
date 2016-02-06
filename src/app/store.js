import { createStore, compose, applyMiddleware } from 'redux';
import state from '../store'

import loggerMiddleware from 'redux-logger'

const store= compose(
  applyMiddleware(loggerMiddleware({ collapsed: (getState, action) => true }))
)(createStore)(state)

export default store
