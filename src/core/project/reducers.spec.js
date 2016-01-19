import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import { loadItems, initialize, creating, created, edit, saving, saved } from './reducers.js'

describe('project/reducers ->', () => {
  it('initializes state from a list of items', () => {
    const item= {name: 'NAME'}
    const before= fromJS({})
    const after= fromJS({
      projects: [
        {item, state: {}},
        {item, state: {}},
        {item, state: {}}
      ],
      change: {}
    })

    expect(loadItems(before, [item, item, item])).to.equal(after)
  })

  it('initializes an empty project', () => {
    const before= fromJS({
      projects: [],
      change: {}
    })
    const after= fromJS({
      projects: [{item: {}, state: {initializing: true}}],
      change: {initialize: 0}
    })

    expect(initialize(before)).to.equal(after)
  })

  it('stores item when creating', () => {
    const before= fromJS({
      projects: [
        {item: {}, state: {initializing: true}}
      ],
      change: {
        initialize: 0,
      }
    })
    const after= fromJS({
      projects: [
        {item: {name: 'NAME'}, state: {isCreating: true}}
      ],
      change: {
        creating: 0,
      }
    })

    expect(creating(before, {name: 'NAME'})).to.equal(after)
  })

  it('stores new project after it is created, deletes project placeholder', () => {
    const before= fromJS({projects: [], new: {}})
    const after= fromJS({projects: [{name: 'NAME'}]})

    expect(created(before, {name: 'NAME'})).to.equal(after)
  })

  it('sets state up for editing a project', () => {
    const project= fromJS({name: 'NAME'})
    const before= fromJS({projects: [project]})
    const after= fromJS({projects: [project], edit: {index: 0, project: project, saving: false}})

    expect(edit(before, project)).to.equal(after)
  })

  it('marks project as being saved', () => {
    const project= fromJS({name: 'NAME'})
    const before= fromJS({projects: [project], edit: {index: 0, project: project, saving: false}})
    const after= fromJS({projects: [project], edit: {index: 0, project: project, saving: true}})

    expect(saving(before)).to.equal(after)
  })

  it('saves changes', () => {
    const project= fromJS({name: 'NEWNAME'})
    const before= fromJS({projects: [{name: 'NAME'}], edit: {index: 0, project: project}})
    const after= fromJS({projects: [project]})

    expect(saved(before)).to.equal(after)
  })
})
