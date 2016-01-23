import { expect } from 'chai'
import { fromJS } from 'immutable'

import { edit, saving, saved } from './reducers-edit.js'

describe('crud/reducers-edit ->', () => {
  it('sets state up for editing a project', () => {
    const project= fromJS({name: 'NAME'})
    const before= fromJS({
      items: [{item: project}],
      change: {}
    })
    const after= fromJS({
      items: [{item: project, isEditing: true}],
      change: {editing: 0}
    })

    expect(edit(before, project)).to.equal(after)
  })

  it('marks project as being saved', () => {
    const project= fromJS({name: 'NAME'})
    const before= fromJS({
      items: [{item: {name: 'NAME'}, isEditing: true}],
      change: {editing: 0}
    })
    const after= fromJS({
      items: [{item: {name: 'NAME', value: 1}, isSaving: true}],
      change: {
        saving: 0,
        savingCopy: project,
      }
    })

    expect(saving(before, {name: 'NAME', value: 1})).to.equal(after)
  })

  it('saved changes', () => {
    const before= fromJS({
      items: [{item: {name: 'NAME'}, isSaving: true}],
      change: {saving: 0}
    })
    const after= fromJS({
      items: [{item: {name: 'NAME', value: 1}}],
      change: {}
    })

    expect(saved(before, {name: 'NAME', value: 1})).to.equal(after)
  })
})
