import { expect } from 'chai'
import { fromJS } from 'immutable'

import { getItem, isInitializing, isEditing, isCreating, isSaving, isRemoving } from './access.js'
import { setInitializing, setEditing, setCreating, setSaving, setRemoving } from './itemstate.js'


describe('crud/access ->', () => {
  it('queries initialize state', () => {
    let item= fromJS({})
    expect(isInitializing(item)).to.equal(false)

    item= setInitializing(item, true)
    expect(isInitializing(item)).to.equal(true)

    item= setInitializing(item, false)
    expect(isInitializing(item)).to.equal(false)
  })

  it('queries edit state', () => {
    let item= fromJS({})
    expect(isEditing(item)).to.equal(false)

    item= setEditing(item, true)
    expect(isEditing(item)).to.equal(true)

    item= setEditing(item, false)
    expect(isEditing(item)).to.equal(false)
  })

  it('queries creating state', () => {
    let item= fromJS({})
    expect(isCreating(item)).to.equal(false)

    item= setCreating(item, true)
    expect(isCreating(item)).to.equal(true)

    item= setCreating(item, false)
    expect(isCreating(item)).to.equal(false)
  })

  it('setting create state clears initial state', () => {
    let item= fromJS({})
    item= setInitializing(item, true)
    item= setCreating(item, true)
    expect(isInitializing(item)).to.equal(false)
  })

  it('queries saving state', () => {
    let item= fromJS({})
    expect(isSaving(item)).to.equal(false)

    item= setSaving(item, true)
    expect(isSaving(item)).to.equal(true)

    item= setSaving(item, false)
    expect(isSaving(item)).to.equal(false)
  })

  it('queries remove state', () => {
    let item= fromJS({})
    expect(isRemoving(item)).to.equal(false)

    item= setRemoving(item, true)
    expect(isRemoving(item)).to.equal(true)

    item= setRemoving(item, false)
    expect(isRemoving(item)).to.equal(false)
  })
})
