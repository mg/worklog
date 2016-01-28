import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import { run, compare } from './reducers-testutils.js'

import actionsFactory from './actions.js'
import reducerFactory from './reducers.js'

let actions
let reducer

describe('crud/reducers-clean ->', () => {
  beforeEach(() => {
    actions= actionsFactory('TEST')
    reducer= reducerFactory('TEST')
  })

  it('pushes new item to end of list', () => {
    const before= fromJS({})
    const after= fromJS([
      { item: {id: 1}},
      { item: {id: 2}},
      { item: {id: 3}},
      { item: {id: 4, name: 'NAME'}},
    ])

    let state= run([
      actions.loadItems([{id: 1}, {id: 2}, {id: 3}]),
      actions.initialize(),
      actions.creating({name: 'NAME'}),
      actions.created({name: 'NAME', id: 4}),
    ], reducer, before)

    compare(state, after)
  })

  it('changes edited item', () => {
    let item= Map({id: 2})
    const before= fromJS({})
    const after= fromJS([
      { item: {id: 1}},
      { item: {id: 2, name: 'NAME', value: 1}},
      { item: {id: 3}},
    ])

    let state= run([
      actions.loadItems([{id: 1}, item, {id: 3}]),
      actions.edit(item),
      actions.saving({id: 2, name: 'NAME'}),
      actions.saved({id: 2, name: 'NAME', value: 1}),
    ], reducer, before)

    compare(state, after)
  })

  it('removes item', () => {
    let item= Map({id: 2})
    const before= fromJS({})
    const after= fromJS([
      { item: {id: 1}},
      { item: {id: 3}},
    ])

    let state= run([
      actions.loadItems([{id: 1}, item, {id: 3}]),
      actions.removing(item),
      actions.removed(),
    ], reducer, before)

    compare(state, after)
  })
})
