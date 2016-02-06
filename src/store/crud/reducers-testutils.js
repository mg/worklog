import { expect } from 'chai'

export const compare= (state, after) => {
  let idx= 0
  state.toArray().forEach(val => {
    expect(val).to.equal(after.get(idx))
    idx++
  })
}

export const run=(actions, reducer, before) => {
  let key
  return actions.reduce(
    (acc, next) => {
      next.key= key
      let state= reducer(acc, next)
      key= next.key
      return state
    },
    before
  )
}
