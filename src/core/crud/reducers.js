import { OrderedMap, fromJS } from 'immutable'

import { timer } from './reducers-common.js'
import { initialize, creating, created } from './reducers-create.js'
import { edit, saving, saved } from './reducers-edit.js'
import { removing, removed } from './reducers-remove.js'

const initialState= OrderedMap({})

export const loadItems= (state, items) => {
  items.forEach(item => {
    let id= timer()
    state= state.set(id, fromJS({item}))
  })

  return state
}

const reducer= (postfix)=> {
  return function(state= initialState, action) {
    switch (action.type) {
    case `LOAD_ITEMS_${postfix}`:
      return loadItems(state, action.payload)
    case `INITIALIZE_${postfix}`:
      return initialize(state, action)
    case `CREATING_${postfix}`:
      return creating(state, action)
    case `CREATED_${postfix}`:
      return created(state, action)
    case `EDIT_${postfix}`:
      return edit(state, action)
    case `SAVING_${postfix}`:
      return saving(state, action)
    case `SAVED_${postfix}`:
      return saved(state, action)
    case `REMOVING_${postfix}`:
      return removing(state, action)
    case `REMOVED_${postfix}`:
      return removed(state, action)
    }
    return state;
  }
}

export default reducer
