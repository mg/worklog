import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import { initialize, creating, created } from './reducers.js'

describe('project/reducers ->', () => {
  it('initializes an empty project', () => {
    const before= fromJS({})
    const after= fromJS({project: {}})

    expect(initialize(before)).to.equal(after)
  })

  it('stores name when creating', () => {
    const before= fromJS({project: {}})
    const after= fromJS({project: {name: 'NAME'}})

    expect(creating(before, 'NAME')).to.equal(after)
  })

  it('stores new project after it is created, deletes project placeholder', () => {
    const before= fromJS({projects: [], project: {}})
    const after= fromJS({projects: [{name: 'NAME'}]})

    expect(created(before, {name: 'NAME'})).to.equal(after)
  })
})
