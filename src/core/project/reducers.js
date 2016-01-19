import { List, Map, fromJS } from 'immutable'

/*
  project= {
    id: '',
    name: ''
    created: new Date(),
    lastUsed: new Date(),
    entries: []
  }
*/

function setInitializing(obj, init) {
  if(init) return obj.updateIn(['state', 'initializing'], val => init)
  return obj.updateIn(['state'], state => state.delete('initializing'))
}

function setEditing(obj, editing) {
  if(editing) return obj.updateIn(['state', 'isEditing'], val => editing)
  return obj.updateIn(['state'], state => state.delete('isEditing'))
}

function setCreating(obj, creating) {
  if(creating) {
    return obj
      .updateIn(['state', 'isCreating'], val => creating)
      .updateIn(['state'], state => state.delete('initializing'))
  }
  return obj.updateIn(['state'], state => state.delete('isCreating'))
}

function setSaving(obj, saving) {
  if(saving) return obj.updateIn(['state', 'isSaving'], val => saving)
  return obj.updateIn(['state'], state => state.delete('isSaving'))
}

function setRemoving(obj, removing) {
  if(removing) return obj.updateIn(['state', 'isRemoving'], val => removing)
  return obj.updateIn(['state'], state => state.delete('isRemoving'))
}

const initialState= Map({
  projects: List([]),
})

const loadItems= (state, items) => {
  return state
    .set(
      'projects',
      fromJS(
        items.map(item => { return {item: item, state: Map({})}})
      )
    )
    .set('change', Map({}))
}

const cancel= (state, op) => {
  let change= state.get('change')
  if(change === undefined)
    return state

  let idx= change.get(op)
  if(idx === undefined) return state

  change= change.delete(op)
  switch(op) {
    case 'initialize':
      return state.updaateIn(['projects'], projects => projects.delete(idx))
    case 'editing':
      return state.updaateIn(['projects', idx], project => setEditing(project, false))
  }
}

const initialize= (state) => {
  state= cancel(state, 'initialize')
  const item= fromJS({ item: {}})
  return state
    .updateIn(['projects'], projects => projects.push(setInitializing(item, true)))
    .setIn(['change', 'initialize'], state.get('projects').size)
}

const creating= (state, project) => {
  const idx= state.get('change').get('initialize')
  return state
    .updateIn(['projects', idx], old => setCreating(old.set('item', Map(project)), true))
    .deleteIn(['change', 'initialize'])
    .setIn(['change', 'creating'], idx)
}

const created= (state, project) => {
  return state
    .updateIn(
      ['projects'], projects => projects.push(Map(project))
    )
    .delete('new')
}

const edit= (state, project) => {
  state= cancel(state, 'edit')
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
  case 'LOAD_ITEMS_PROJECT':
    return loadItems(state, action.payload)
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
export { loadItems, initialize, creating, created, edit, saving, saved }
