export function setInitializing(obj, init) {
  if(init) return obj.set('isInitializing', true)
  return obj.delete('isInitializing')
}

export function setEditing(obj, editing) {
  if(editing) return setError(obj, false).set('isEditing', true)
  return obj.delete('isEditing')
}

export function setCreating(obj, creating) {
  if(creating) {
    return setError(obj, false)
      .set('isCreating', true)
      .delete('isInitializing')
  }
  return obj.delete('isCreating')
}

export function setSaving(obj, saving) {
  if(saving) return setError(obj, false).set('isSaving', true)
  return obj.delete('isSaving')
}

export function setRemoving(obj, removing) {
  if(removing) return setError(obj, false).set('isRemoving', true)
  return obj.delete('isRemoving')
}

export function setError(obj, error, description) {
  if(error) return obj.set('isError', true).set('error', description)
  return obj.delete('isError').delete('error')
}
