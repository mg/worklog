import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import { setInitializing, setEditing, setCreating, setSaving, setRemoving } from './itemstate.js'

describe('crud/itemstate ->', () => {
  it('sets isInitializing to true', () => {
    const before= fromJS({})
    const after= fromJS({isInitializing: true})

    expect(setInitializing(before, true)).to.equal(after)
  })

  it('clears isInitializing', () => {
    const before= fromJS({isInitializing: true})
    const after= fromJS({})

    expect(setInitializing(before, false)).to.equal(after)
  })

  it('sets isEditing to true', () => {
    const before= fromJS({})
    const after= fromJS({isEditing: true})

    expect(setEditing(before, true)).to.equal(after)
  })

  it('clears isEditing', () => {
    const before= fromJS({isEditing: true})
    const after= fromJS({})

    expect(setEditing(before, false)).to.equal(after)
  })

  it('sets isCreating to true', () => {
    const before= fromJS({})
    const after= fromJS({isCreating: true})

    expect(setCreating(before, true)).to.equal(after)
  })

  it('clears isCreating', () => {
    const before= fromJS({isCreating: true})
    const after= fromJS({})

    expect(setCreating(before, false)).to.equal(after)
  })

  it('sets isSaving to true', () => {
    const before= fromJS({})
    const after= fromJS({isSaving: true})

    expect(setSaving(before, true)).to.equal(after)
  })

  it('clears isSaving', () => {
    const before= fromJS({isSaving: true})
    const after= fromJS({})

    expect(setSaving(before, false)).to.equal(after)
  })

  it('sets isRemoving to true', () => {
    const before= fromJS({})
    const after= fromJS({isRemoving: true})

    expect(setRemoving(before, true)).to.equal(after)
  })

  it('clears isRemoving', () => {
    const before= fromJS({isRemoving: true})
    const after= fromJS({})

    expect(setRemoving(before, false)).to.equal(after)
  })
})
