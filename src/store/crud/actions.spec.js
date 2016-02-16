import { expect } from 'chai'

import actions, { internal } from './actions.js'
let crud

describe('crud/actions ->', () => {
  beforeEach(() => {
    crud= {
      ...actions('TEST'),
      ...internal('TEST'),
    }
  })

  it('sets up initialize action', () => {
    const action= crud.initialize();
    expect(action.type).to.equal('INITIALIZE_TEST')
  })

  const testAction= (action, prefix) => {
    const payload= {}
    const actionToTest= action(payload);
    expect(actionToTest.type).to.equal(`${prefix}_TEST`)
    expect(actionToTest.payload).to.equal(payload)
  }

  it('sets up create action', () => {
    testAction(crud.create, 'CREATE')
  })

  it('sets up creating action', () => {
    testAction(crud.creating, 'CREATING')
  })

  it('sets up created action', () => {
    testAction(crud.created, 'CREATED')
  })

  it('sets up edit action', () => {
    testAction(crud.edit, 'EDIT')
  })

  it('sets up save action', () => {
    testAction(crud.save, 'SAVE')
  })

  it('sets up saving action', () => {
    testAction(crud.saving, 'SAVING')
  })

  it('sets up saved action', () => {
    testAction(crud.saved, 'SAVED')
  })

  it('sets up remove action', () => {
    testAction(crud.remove, 'REMOVE')
  })

  it('sets up removing action', () => {
    testAction(crud.removing, 'REMOVING')
  })

  it('sets up removed action', () => {
    testAction(crud.removed, 'REMOVED')
  })
})
