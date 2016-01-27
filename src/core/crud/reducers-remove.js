import { fromJS } from 'immutable'
import { setRemoving } from './itemstate.js'
import { cancel } from './reducers-common.js'

export const removing= (state, action) => {
  let entry= state.findEntry(item => item.get('item') === action.payload)
  if(entry !== undefined) {
    state= state.set(
      entry[0],
      setRemoving(fromJS({
        item: entry[1].get('item')
      }), true))
    action.key= entry[0]
  }
  return state
/*  let idx= state.get('items').findIndex(inList => inList.get('item') === item)
  if(idx === -1 && state.getIn(['change', 'savingCopy']) !== item) {
    return state
  } else if(idx === -1) {
    idx= state.getIn(['change', 'saving'])
  }

  if(state.get('change').get('editing') === idx) {
    state= cancel(state, 'editing')
  }
  if(state.get('change').get('saving') === idx) {
    state= state
      .deleteIn(['change', 'saving'])
      .deleteIn(['change', 'savingCopy'])
      .updateIn(['items', idx], inList => setSaving(inList, false))
  }

  return state
    .updateIn(['items', idx], inList => setRemoving(inList, true))
    .setIn(['change', 'removing'], idx)*/
}

export const removed= (state, action) => {
  if(state.has(action.key)) {
    return state.delete(action.key)
  }
  return state
/*  const idx= state.get('change').get('removing')

  return state
    .updateIn(['items'], items => items.delete(idx))
    .deleteIn(['change', 'removing'])*/
}
