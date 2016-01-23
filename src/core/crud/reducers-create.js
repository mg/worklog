import { fromJS } from 'immutable'
import { setInitializing, setCreating } from './itemstate.js'
import { cancel } from './reducers-common.js'

export const initialize= (state) => {
  state= cancel(state, 'initialize')
  const item= fromJS({ item: {}})

  return state
    .updateIn(['items'], items => items.push(setInitializing(item, true)))
    .setIn(['change', 'initialize'], state.get('items').size)
}

export const creating= (state, item) => {
  const idx= state.get('change').get('initialize')
  if(idx === -1) return state

  return state
    .updateIn(['items', idx], inList => setCreating(inList.set('item', fromJS(item)), true))
    .deleteIn(['change', 'initialize'])
    .setIn(['change', 'creating'], idx)
}

export const created= (state, item) => {
  const idx= state.get('change').get('creating')
  if(idx === -1) return state

  return state
    .updateIn(['items', idx], old => {  return fromJS({ item })})
    .deleteIn(['change', 'creating'])
}
