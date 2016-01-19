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
  return state.set(
    'new', Map({})
  )
}

const creating= (state, name) => {
  return state.updateIn(
    ['new'], project => project.set('name', name)
  )
}

const created= (state, project) => {
  return state
    .updateIn(
      ['projects'], projects => projects.push(Map(project))
    )
    .delete('new')
}

const edit= (state, project) => {
  return state.set(
    'edit', Map({
      index: state.get('projects').indexOf(project),
      project: project,
      saving: false,
    })
  )
}

const saving= (state) => {
  return state.updateIn(
    ['edit'], edit => edit.set('saving', true)
  )
}

const saved= (state) => {
  return state
    .updateIn(
      ['projects', state.get('edit').get('index')],
      project => state.get('edit').get('project')
    )
    .delete('edit')
}

const reducer= (state= initialState, action) => {
  switch (action.type) {
  case 'INITIALIZE_PROJECT':
    return initalize(state)
  case 'CREATING_PROJECT':
    return creating(state, action.payload)
  case 'CREATED_PROJECT':
    return created(state, action.payload)
  case 'EDIT_PROJECT':
    return edit(state, action.payload)
  case 'SAVING_PROJECT':
    return saving(state)
  case 'SAVED_PROJECT':
    return saved(state)
  }
  return state;
}

export default reducer
export { initialize, creating, created, edit, saving, saved }
