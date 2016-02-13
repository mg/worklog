import { createStore, compose, applyMiddleware } from 'redux';
import state from '../store'

export default function(extraMiddlewares, devTools) {
  return compose(
    ...extraMiddlewares.map(middleware => applyMiddleware(middleware)),
    devTools ? devTools.instrument() : f => f,
  )(createStore)(state)
}
