import createHistory from 'history/lib/createHashHistory'
import loggerMiddleware from 'redux-logger'

import devTools from './devtools.jsx'

import { actions as projectActions } from './store/project'
console.log(projectActions)

import mount from './app/mount'

mount(
  createHistory(),
  'app',
  store => {
    store.dispatch(
      projectActions.loadItems([
        {name: 'Project 1'},
        {name: 'Project 2'},
        {name: 'Project 3'},
      ])
    )
    return store
  },
  [
    loggerMiddleware({ collapsed: (getState, action) => true }),
  ],
  devTools,
)
