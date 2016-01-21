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
  items: List([]),
})

const loadItems= (state, items) => {
  return state
    .set(
      'items',
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
      return state.updateIn(['items'], items => items.delete(idx))
    case 'editing':
      return state.updateIn(['items', idx], item => setEditing(item, false))
  }
}

const initialize= (state) => {
  state= cancel(state, 'initialize')
  const item= fromJS({ item: {}})

  return state
    .updateIn(['items'], items => items.push(setInitializing(item, true)))
    .setIn(['change', 'initialize'], state.get('items').size)
}

const creating= (state, item) => {
  const idx= state.get('change').get('initialize')
  if(idx === -1) return this.state

  return state
    .updateIn(['items', idx], inList => setCreating(inList.set('item', fromJS(item)), true))
    .deleteIn(['change', 'initialize'])
    .setIn(['change', 'creating'], idx)
}

const created= (state, item) => {
  const idx= state.get('change').get('creating')
  if(idx === -1) return this.state

  return state
    .updateIn(['items', idx], old => {  return fromJS({ item })})
    .deleteIn(['change', 'creating'])
}

const edit= (state, item) => {
  state= cancel(state, 'edit')
  const idx= state.get('items').findIndex(inList => inList.get('item') === item)
  if(idx === -1) return this.state

  return state
    .updateIn(['items', idx], inList => setEditing(inList, true))
    .setIn(['change', 'editing'], idx)
}

const saving= (state, item) => {
  const idx= state.get('change').get('editing')
  if(idx === -1) return this.state

  return state
    .updateIn(['items', idx], inList => setSaving(fromJS({item}), true))
      .deleteIn(['change', 'editing'])
      .setIn(['change', 'saving'], idx)
}

const saved= (state, item) => {
  const idx= state.get('change').get('saving')

  return state
    .updateIn(['items', idx], inList => { return fromJS({item})})
    .deleteIn(['change', 'saving'])
}

const removing= (state, item) => {
  const idx= state.get('items').findIndex(inList => inList.get('item') === item)
  if(idx === -1) return state

  return state
    .updateIn(['items', idx], inList => setRemoving(inList, true))
    .setIn(['change', 'removing'], idx)
}

const removed= (state, item) => {
  const idx= state.get('items').findIndex(inList => inList.get('item') === item)
  if(state.get('change').get('editing') === idx) {
    cancel(state, 'edit')
  }
  if(state.get('change').get('saving') === idx) {
    state= state.deleteIn(['change', 'saving'])
  }

  return state
    .updateIn(['items'], items => items.delete(idx))
    .deleteIn(['change', 'removing'])
}

const reducers= (postfix )=> {
  return function(state= initialState, action) {
    switch (action.type) {
    case `LOAD_ITEMS_${postfix}`:
      return loadItems(state, action.payload)
    case `INITIALIZE_${postfix}`:
      return initalize(state)
    case `CREATING_${postfix}`:
      return creating(state, action.payload)
    case `CREATED_${postfix}`:
      return created(state, action.payload)
    case `EDIT_${postfix}`:
      return edit(state, action.payload)
    case `SAVING_${postfix}`:
      return saving(state, action.payload)
    case `SAVED_${postfix}`:
      return saved(state, action.payload)
    case `REMOVING_${postfix}`:
      return saved(state, action.payload)
    case `REMOVED_${postfix}`:
      return saved(state, action.payload)
    }
    return state;
  }
}

export default reducers
export { loadItems, initialize, creating, created, edit, saving, saved, removing, removed }
