import { fromJS } from 'immutable'
import { isInitializing } from './access.js'
import { setInitializing, setCreating } from './itemstate.js'
import { timer, cancel } from './reducers-common.js'

export const initialize= (state, action) => {
  let item= state.find(item => isInitializing(item))
  if(item === undefined) {
    item= setInitializing(fromJS({item: {}}), true)
    const key= timer()
    state= state.set(key, item)
    action.key= key
  }
  return state
}

export const creating= (state, action) => {
  let item= state.get(action.key)
  item= setCreating(setInitializing(item, false), true)
  item= item.set('item', fromJS(action.payload))

  return state.set(action.key, item)
}

export const created= (state, action) => {
  let item= state.get(action.key)
  item= setCreating(setInitializing(item, false), false)
  item= item.set('item', fromJS(action.payload))

  return state.set(action.key, item)
}
