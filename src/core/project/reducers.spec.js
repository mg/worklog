import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import { initialize, creating, created, edit, saving, saved } from './reducers.js'

describe('project/reducers ->', () => {
  it('initializes an empty project', () => {
    const before= fromJS({})
    const after= fromJS({new: {}})

    expect(initialize(before)).to.equal(after)
  })

  it('stores name when creating', () => {
    const before= fromJS({new: {}})
    const after= fromJS({new: {name: 'NAME'}})

    expect(creating(before, 'NAME')).to.equal(after)
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
