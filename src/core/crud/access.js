export function getItem(obj) {
  return obj.get('item')
}

export function isInitalizing(obj) {
  return obj.get('state').get('initializing') === true
}

export function isEditing(obj) {
  return obj.get('state').get('isEditing') === true
}

export function isCreating(obj) {
  return obj.get('state').get('isCreating') === true
}

export function isSaving(obj) {
  return obj.get('state').get('isSaving') === true
}

export function isRemoving(obj) {
  return obj.get('state').get('isRemoving') === true
}
