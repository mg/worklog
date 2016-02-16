import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import { run, compare } from './reducers-testutils.js'

import actionsFactory, { internal as internalActionsFactory } from './actions.js'
import reducerFactory from './reducers.js'

let actions
let reducer

describe('crud/reducer-chaos ->', () => {
  beforeEach(() => {
    actions= {
      ...actionsFactory('TEST'),
      ...internalActionsFactory('TEST'),
    }
    reducer= reducerFactory('TEST')
  })

  it('removing an item that is being edited', () => {
    const item= Map({id: 2})
    const before= fromJS({})
    const after= fromJS([
      { item: {id: 1}},
      { item: {id: 3}},
    ])

    let state= run([
      actions.loadItems([{id: 1}, item, {id: 3}]),
      actions.edit(item),
      actions.removing(item),
      actions.saving({id: 2, name: 'NAME'}),
      actions.saved({id: 2, name: 'NAME', value: 1}),
      actions.removed(),
    ], reducer, before)

    compare(before, after)
  })

  it('restores item when saving after removing', () => {
    const item= Map({id: 2})
    const before= fromJS({})
    const after= fromJS([
      { item: {id: 1}},
      { item: {id: 3}},
      { item: {id: 2, name: 'NAME', value: 1}},
    ])

    let state= run([
      actions.loadItems([{id: 1}, item, {id: 3}]),
      actions.edit(item),
      actions.saving({id: 2, name: 'NAME'}),
      actions.removing(item),
      actions.saved({id: 2, name: 'NAME', value: 1}),
      actions.removed(),
      actions.saved({id: 2, name: 'NAME', value: 1}),
    ], reducer, before)

    compare(before, after)
  })

  it('removing is idempodent', () => {
    const item= Map({id: 2})
    const before= fromJS({})
    const after= fromJS([
      { item: {id: 1}},
      { item: {id: 3}},
    ])

    let state= run([
      actions.loadItems([{id: 1}, item, {id: 3}]),
      actions.removing(item),
      actions.removing(item),
      actions.removed(),
      actions.removed(),
    ], reducer, before)

    compare(before, after)
  })

  it('last save wins', () => {
    const item= Map({id: 2})
    const before= fromJS({})
    const after= fromJS([
      { item: {id: 1}},
      { item: {id: 3}},
    ])

    let state= run([
      actions.loadItems([{id: 1}, item, {id: 3}]),
      actions.edit(item),
      actions.saving({id: 2, name: 'NAME'}),
      actions.edit(item),
      actions.saving({id: 2, name: 'NAME2'}),
      actions.saved({id: 2, name: 'NAME'}),
      actions.saved({id: 2, name: 'NAME2'}),
    ], reducer, before)

    compare(before, after)
  })
})
