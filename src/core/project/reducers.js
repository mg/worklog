import { List, Map } from 'immutable'

/*
  project= {
    id: '',
    name: ''
    created: new Date(),
    lastUsed: new Date(),
    entries: []
  }
*/

const initialState= Map({
  projects: List([]),
})

const initialize= (state) => {
  return state.set('project', Map({}))
}

const creating= (state, name) => {
  return state.updateIn(['project'], project => project.set('name', name))
}

const created= (state, project) => {
  return state
    .updateIn(['projects'], projects => projects.push(Map(project)))
    .delete('project')
}

const reducer= (state= initialState, action) => {
  switch (action.type) {
  case 'INITIALIZE_PROJECT':
    return initalize(state)
  case 'CREATING_PROJECT':
    return creating(state, action.payload)
  case 'CREATED_PROJECT':
    return created(state, action.payload)
  }
  return state;
}

export default reducer
export { initialize, creating, created }
