import { expect } from 'chai'
import { fromJS } from 'immutable'

import { compare } from './reducers-testutils.js'
import { initialize, creating, created } from './reducers-create.js'

describe('crud/reducers-create ->', () => {
  it('initializes an empty project', () => {
    const before= fromJS({})
    const after= fromJS([
      {item: {}, isInitializing: true},
    ])

    let action= {}
    compare(
      initialize(before, action),
      after
    )
    expect(action.key).to.not.equal(undefined)
  })

  it('marks item as being created, clears isInitalizing, updates with new data', () => {
    const before= fromJS({
      'key': {
        item: {},
        isInitializing: true
      },
    })
    const after= fromJS({
      'key': {
        item: {name: 'NAME'},
        isCreating: true
      },
    })

    expect(creating(before, {payload: {name: 'NAME'}, key: 'key'})).to.equal(after)
  })

  it('updates item with new data, clears isCreating flag', () => {
    const before= fromJS({
      'key': {
        item: {name: 'NAME'},
        isCreating: true,
      },
    })
    const after= fromJS({
      'key': {
        item: {
          name: 'NAME',
          value: 1
        },
      },
    })

    expect(created(before, {payload: {name: 'NAME', value: 1}, key: 'key'})).to.equal(after)
  })
})
