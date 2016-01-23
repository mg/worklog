import { expect } from 'chai'
import { fromJS } from 'immutable'

import { removing, removed } from './reducers-remove.js'

describe('crud/reducers-remove ->', () => {
  it('marks as being removed', () => {
    const project= fromJS({name: 'NAME'})
    const before= fromJS({
      items: [{item: project}],
      change: {}
    })
    const after= fromJS({
      items: [{item: project, isRemoving: true}],
      change: {removing: 0}
    })

    expect(removing(before, project)).to.equal(after)
  })

  it('removes item', () => {
    const before= fromJS({
      items: [{item: {name: 'NAME'}, isRemoving: true}, {}],
      change: {removing: 0}
    })
    const after= fromJS({
      items: [{}],
      change: {}
    })

    expect(removed(before)).to.equal(after)
  })
})
