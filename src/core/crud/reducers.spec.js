import { expect } from 'chai'
import { fromJS } from 'immutable'

import { loadItems } from './reducers.js'

describe('crud/reducers ->', () => {
  it('initializes state from a list of items', () => {
    const item= {name: 'NAME'}
    const before= fromJS({})
    const after= fromJS({
      items: [
        {item},
        {item},
        {item},
      ],
      change: {}
    })

    expect(loadItems(before, [item, item, item])).to.equal(after)
  })
})
