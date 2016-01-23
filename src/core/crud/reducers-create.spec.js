import { expect } from 'chai'
import { fromJS } from 'immutable'

import { initialize, creating, created } from './reducers-create.js'

describe('crud/reducers-create ->', () => {
  it('initializes an empty project', () => {
    const before= fromJS({
      items: [],
      change: {}
    })
    const after= fromJS({
      items: [{item: {}, isInitializing: true}],
      change: {initialize: 0}
    })

    expect(initialize(before)).to.equal(after)
  })

  it('stores item when creating', () => {
    const before= fromJS({
      items: [
        {item: {}, isInitializing: true}
      ],
      change: {
        initialize: 0,
      }
    })
    const after= fromJS({
      items: [
        {item: {name: 'NAME'}, isCreating: true}
      ],
      change: {
        creating: 0,
      }
    })

    expect(creating(before, {name: 'NAME'})).to.equal(after)
  })

  it('stores new project after it is created, deletes project placeholder', () => {
    const before= fromJS({
      items: [
        {item: {name: 'NAME'}, isCreating: true}
      ],
      change: {
        creating: 0,
      }
    })
    const after= fromJS({
      items: [
        {item: {name: 'NAME', value: 1}}
      ],
      change: {
      }
    })

    expect(created(before, {name: 'NAME', value: 1})).to.equal(after)
  })
})
