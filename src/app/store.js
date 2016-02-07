import { createStore, compose, applyMiddleware } from 'redux';
import state from '../store'

export default function(extraMiddlewares) {
  return compose(
    ...extraMiddlewares.map(middleware => applyMiddleware(middleware)),
  )(createStore)(state)
}
