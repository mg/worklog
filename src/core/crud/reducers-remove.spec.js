import { expect } from 'chai'
import { fromJS } from 'immutable'

import { removing, removed } from './reducers-remove.js'

describe('crud/reducers-remove ->', () => {
  it('marks as being removed', () => {
    const item= fromJS({name: 'NAME'})
    const before= fromJS({
      'key': {
        item: item,
      }
    })
    const after= fromJS({
      'key': {
        item: item,
        isRemoving: true,
      }
    })

    let action= {payload: item}
    expect(removing(before, action)).to.equal(after)
    expect(action.key).to.equal('key')
  })

  it('removes item', () => {
    const before= fromJS({
      'key': {
        item: {name: 'NAME'},
        isRemoving: true,
      }
    })
    const after= fromJS({
    })

    let action= {key: 'key'}
    expect(removed(before, action)).to.equal(after)
  })
})
