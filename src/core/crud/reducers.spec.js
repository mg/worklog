import { expect } from 'chai'
import { fromJS } from 'immutable'

import { compare } from './reducers-testutils.js'
import { loadItems } from './reducers.js'

describe('crud/reducers ->', () => {
  it('initializes state from a list of items', () => {
    const before= fromJS({})
    const after= fromJS([
      {item: {name: 'NAME1'}},
      {item: {name: 'NAME2'}},
      {item: {name: 'NAME3'}},
    ])

    compare(
      loadItems(before, [{name: 'NAME1'}, {name: 'NAME2'}, {name: 'NAME3'}]),
      after
    )
  })
})
