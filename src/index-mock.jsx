import createHistory from 'history/lib/createHashHistory'
import mount from './app/mount'

import { actions as projectActions } from './store/project'
console.log(projectActions)

mount(createHistory(), 'app', store => {
  store.dispatch(
    projectActions.loadItems([
      {name: 'Project 1'},
      {name: 'Project 2'},
      {name: 'Project 3'},
    ])
  )
  return store
})
