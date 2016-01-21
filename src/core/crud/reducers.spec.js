import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import { loadItems, initialize, creating, created, edit, saving, saved, removing, removed } from './reducers.js'

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

  it('initializes an empty project', () => {
    const before= fromJS({
      items: [],
      change: {}
    })
    const after= fromJS({
      items: [{item: {}, state: {initializing: true}}],
      change: {initialize: 0}
    })

    expect(initialize(before)).to.equal(after)
  })

  it('stores item when creating', () => {
    const before= fromJS({
      items: [
        {item: {}, state: {initializing: true}}
      ],
      change: {
        initialize: 0,
      }
    })
    const after= fromJS({
      items: [
        {item: {name: 'NAME'}, state: {isCreating: true}}
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
        {item: {name: 'NAME'}, state: {isCreating: true}}
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

  it('sets state up for editing a project', () => {
    const project= fromJS({name: 'NAME'})
    const before= fromJS({
      items: [{item: project}],
      change: {}
    })
    const after= fromJS({
      items: [{item: project, state: {isEditing: true}}],
      change: {editing: 0}
    })

    expect(edit(before, project)).to.equal(after)
  })

  it('marks project as being saved', () => {
    const project= fromJS({name: 'NAME'})
    const before= fromJS({
      items: [{item: {name: 'NAME'}, state: {isEditing: true}}],
      change: {editing: 0}
    })
    const after= fromJS({
      items: [{item: {name: 'NAME', value: 1}, state: {isSaving: true}}],
      change: {saving: 0}
    })

    expect(saving(before, {name: 'NAME', value: 1})).to.equal(after)
  })

  it('saved changes', () => {
    const before= fromJS({
      items: [{item: {name: 'NAME'}, state: {isSaving: true}}],
      change: {saving: 0}
    })
    const after= fromJS({
      items: [{item: {name: 'NAME', value: 1}}],
      change: {}
    })

    expect(saved(before, {name: 'NAME', value: 1})).to.equal(after)
  })

  it('marks as being removed', () => {
    const project= fromJS({name: 'NAME'})
    const before= fromJS({
      items: [{item: project}],
      change: {}
    })
    const after= fromJS({
      items: [{item: project, state: {isRemoving: true}}],
      change: {removing: 0}
    })

    expect(removing(before, project)).to.equal(after)
  })

  it('removes item', () => {
    const before= fromJS({
      items: [{item: {name: 'NAME'}, state: {isRemoving: true}}],
      change: {removing: 0}
    })
    const after= fromJS({
      items: [],
      change: {}
    })

    expect(removed(before)).to.equal(after)
  })
})
