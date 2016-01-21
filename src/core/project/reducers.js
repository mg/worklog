import { List, Map, fromJS } from 'immutable'

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
        items.map(item => { return {item: item}})
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

  state.set('change', change.delete(op))
  switch(op) {
    case 'initialize':
      return state.updateIn(['projects'], projects => projects.delete(idx))
    case 'editing':
      return state.updateIn(['projects', idx], project => setEditing(project, false))
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
  if(idx === -1) return this.state

  return state
    .updateIn(['projects', idx], old => setCreating(old.set('item', Map(project)), true))
    .deleteIn(['change', 'initialize'])
    .setIn(['change', 'creating'], idx)
}

const created= (state, project) => {
  const idx= state.get('change').get('creating')
  if(idx === -1) return this.state

  return state
    .updateIn(
      ['projects', idx], item => {  return fromJS({ item: project })}
    )
    .deleteIn(['change', 'creating'])
}

const edit= (state, project) => {
  state= cancel(state, 'edit')
  const idx= state.get('projects').findIndex(item => item.get('item') === project)
  if(idx === -1) return this.state

  return state
    .updateIn(['projects', idx], item => setEditing(item, true))
    .setIn(['change', 'editing'], idx)
}

const saving= (state, project) => {
  const idx= state.get('change').get('editing')
  if(idx === -1) return this.state

  return state
    .updateIn(['projects', idx], item => setSaving(fromJS({item: project}), true))
      .deleteIn(['change', 'editing'])
      .setIn(['change', 'saving'], idx)
}

const saved= (state, project) => {
  const idx= state.get('change').get('saving')

  return state
    .updateIn(['projects', idx], item => { return fromJS({item: project})})
    .deleteIn(['change', 'saving'])
}

const removing= (state, project) => {
  const idx= state.get('projects').findIndex(item => item.get('item') === project)
  if(idx === -1) return state

  return state
    .updateIn(['projects', idx], item => setRemoving(item, true))
    .setIn(['change', 'removing'], idx)
}

const removed= (state, project) => {
  const idx= state.get('projects').findIndex(item => item.get('item') === project)
  if(state.get('change').get('editing') === idx) {
    cancel(state, 'edit')
  }
  if(state.get('change').get('saving') === idx) {
    state= state.deleteIn(['change', 'saving'])
  }

  return state
    .updateIn(['projects'], projects => projects.delete(idx))
    .deleteIn(['change', 'removing'])
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
    return saving(state, action.payload)
  case 'SAVED_PROJECT':
    return saved(state, action.payload)
  case 'REMOVING_PROJECT':
    return saved(state, action.payload)
  case 'REMOVED_PROJECT':
    return saved(state, action.payload)
  }
  return state;
}

export default reducer
export { loadItems, initialize, creating, created, edit, saving, saved, removing, removed }
