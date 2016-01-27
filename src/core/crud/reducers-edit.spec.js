import { expect } from 'chai'
import { fromJS } from 'immutable'

import { edit, saving, saved } from './reducers-edit.js'

describe('crud/reducers-edit ->', () => {
  it('sets state up for editing a project', () => {
    const item= fromJS({name: 'NAME'})
    const before= fromJS({
      'key': {
        item: item,
      }
    })
    const after= fromJS({
      'key': {
        item: item,
        isEditing: true,
      }
    })

    let action= {payload: item}
    expect(edit(before, action)).to.equal(after)
    expect(action.key).to.equal('key')
  })

  it('marks item as being saved', () => {
    const before= fromJS({
      'key': {
        item: {name: 'NAME'},
        isEditing: true,
      }
    })
    const after= fromJS({
      'key': {
        item: {name: 'NAME', value: 1},
        isSaving: true,
      }
    })

    let action= {key: 'key', payload: {name: 'NAME', value: 1}}
    expect(saving(before, action)).to.equal(after)
  })

  it('saved changes', () => {
    const before= fromJS({
      'key': {
        item: {name: 'NAME', value: 1},
        isSaving: true,
      }
    })
    const after= fromJS({
      'key': {
        item: {name: 'NAME', value: 1, id: '1'}
      }
    })

    let action= {key: 'key', payload: {name: 'NAME', value: 1, id: '1'}}
    expect(saved(before, action)).to.equal(after)
  })
})
