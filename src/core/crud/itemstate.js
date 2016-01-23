export function setInitializing(obj, init) {
  if(init) return obj.set('isInitializing', true)
  return obj.delete('isInitializing')
}

export function setEditing(obj, editing) {
  if(editing) return obj.set('isEditing', true)
  return obj.delete('isEditing')
}

export function setCreating(obj, creating) {
  if(creating) {
    return obj
      .set('isCreating', true)
      .delete('isInitializing')
  }
  return obj.delete('isCreating')
}

export function setSaving(obj, saving) {
  if(saving) return obj.set('isSaving', true)
  return obj.delete('isSaving')
}

export function setRemoving(obj, removing) {
  if(removing) return obj.set('isRemoving', true)
  return obj.delete('isRemoving')
}
