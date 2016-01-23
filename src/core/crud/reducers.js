import { List, Map, fromJS } from 'immutable'

import { initialize, creating, created } from './reducers-create.js'
import { edit, saving, saved } from './reducers-edit.js'
import { removing, removed } from './reducers-remove.js'

const initialState= Map({
  items: List([]),
})

export const loadItems= (state, items) => {
  return state
    .set(
      'items',
      fromJS(
        items.map(item => { return {item: item}})
      )
    )
    .set('change', Map({}))
}

const reducer= (postfix)=> {
  return function(state= initialState, action) {
    switch (action.type) {
    case `LOAD_ITEMS_${postfix}`:
      return loadItems(state, action.payload)
    case `INITIALIZE_${postfix}`:
      return initialize(state)
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
      return removing(state, action.payload)
    case `REMOVED_${postfix}`:
      return removed(state)
    }
    return state;
  }
}

export default reducer
