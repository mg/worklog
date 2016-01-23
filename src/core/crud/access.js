export function getItem(obj) {
  return obj.get('item')
}

export function isInitializing(obj) {
  return obj.get('isInitializing') === true
}

export function isEditing(obj) {
  return obj.get('isEditing') === true
}

export function isCreating(obj) {
  return obj.get('isCreating') === true
}

export function isSaving(obj) {
  return obj.get('isSaving') === true
}

export function isRemoving(obj) {
  return obj.get('isRemoving') === true
}
