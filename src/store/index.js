import { combineReducers } from 'redux'

import { reducer as projects } from './project'

const state = combineReducers({
  projects,
})

export default state
