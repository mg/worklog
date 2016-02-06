import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import { run, compare } from './reducers-testutils.js'

import actionsFactory from './actions.js'
import reducerFactory from './reducers.js'

let actions
let reducer

describe('crud/reducers-asyncerrors ->', () => {
  beforeEach(() => {
    actions= actionsFactory('TEST')
    reducer= reducerFactory('TEST')
  })

  it('flags error when error occurs when creating', () => {
    const before= fromJS({})
    const after= fromJS([
      { item: {id: 1}},
      { item: {id: 2}},
      {
        item: {name: 'NAME'},
        isCreating: true,
        isError: true,
        error: 'ERROR'
      },
    ])

    let state= run([
      actions.loadItems([{id: 1}, {id: 2}]),
      actions.initialize(),
      actions.creating({name: 'NAME'}),
      actions.errorCreating('ERROR')
    ], reducer, before)

    compare(state, after)
  })

  it('flags error when error occurs when editing', () => {
    const item= fromJS({id: 2, name: 'NAME'})
    const before= fromJS({})
    const after= fromJS([
      { item: {id: 1}},
      {
        item: {id: 2, name: 'NAME2'},
        isSaving: true,
        isError: true,
        error: 'ERROR'
      },
    ])

    let state= run([
      actions.loadItems([{id: 1}, item]),
      actions.edit(item),
      actions.saving({id: 2, name: 'NAME2'}),
      actions.errorSaving('ERROR')
    ], reducer, before)

    compare(state, after)
  })

  it('flags error when error occurs when remvoing', () => {
    const item= fromJS({id: 2, name: 'NAME'})
    const before= fromJS({})
    const after= fromJS([
      { item: {id: 1}},
      {
        item: {id: 2, name: 'NAME'},
        isRemoving: true,
        isError: true,
        error: 'ERROR'
      },
    ])

    let state= run([
      actions.loadItems([{id: 1}, item]),
      actions.removing(item),
      actions.errorRemoving('ERROR')
    ], reducer, before)

    compare(state, after)
  })
})
