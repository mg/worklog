import { fromJS } from 'immutable'
import { setEditing, setSaving } from './itemstate.js'
import { cancel } from './reducers-common.js'

export const edit= (state, item) => {
  state= cancel(state, 'editing')
  let idx= state.get('items').findIndex(inList => inList.get('item') === item)
  if(idx === -1 && state.getIn(['change', 'savingCopy']) !== item) {
    return state
  } else if(idx === -1) {
    idx= state.getIn(['change', 'saving'])
    state= cancel(state, 'saving')
    state= state.deleteIn(['change', 'savingCopy'])
  }

  if(idx === state.getIn(['change', 'removing'])) {
    return state
  }

  return state
    .updateIn(['items', idx], inList => setEditing(inList, true))
    .setIn(['change', 'editing'], idx)
}

export const saving= (state, item) => {
  const idx= state.get('change').get('editing')
  if(idx === -1) {
    return state
  }
  const copy= state.getIn(['items', idx, 'item'])

  return state
    .updateIn(['items', idx], inList => setSaving(fromJS({item}), true))
    .deleteIn(['change', 'editing'])
    .setIn(['change', 'saving'], idx)
    .setIn(['change', 'savingCopy'], copy)
}

export const saved= (state, item) => {
  const idx= state.get('change').get('saving')

  return state
    .updateIn(['items', idx], inList => { return fromJS({item})})
    .deleteIn(['change', 'saving'])
    .deleteIn(['change', 'savingCopy'])
}
