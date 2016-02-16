import { combineReducers } from 'redux'

import { reducer as projects } from './project'

const store = combineReducers({
  projects,
})

export default store
