import { setEditing, setSaving } from './itemstate.js'

let timer
if(global.performance !== undefined) timer= () => global.performance.now()
else timer= () => parseInt(process.hrtime().join(''))

export { timer }

export const cancel= (state, op) => {
  let change= state.get('change')
  if(change === undefined)
    return state

  let idx= change.get(op)
  if(idx === undefined) return state

  state= state.set('change', change.delete(op))
  switch(op) {
    case 'initialize':
      return state.updateIn(['items'], items => items.delete(idx))
    case 'editing':
      return state.updateIn(['items', idx], item => setEditing(item, false))
    case 'saving':
      return state.updateIn(['items', idx], item => setSaving(item, false))
  }
}
