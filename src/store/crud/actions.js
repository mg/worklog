export default function(name) {
  const action= (prefix, payload, key) => {
    return {
      type: `${prefix}_${name}`,
      payload,
      key,
    }
  }

  const initialize= () => {
    return {
      type: `INITIALIZE_${name}`,
    }
  }

  const loadItems= (payload) => action('LOAD_ITEMS', payload)
  const create= (payload) => action('CREATE', payload)
  const creating= (payload, key) => action('CREATING', payload, key)
  const created= (payload, key) => action('CREATED', payload, key)
  const edit= (payload) => action('EDIT', payload)
  const save= (payload, key) => action('SAVE', payload, key)
  const saving= (payload, key) => action('SAVING', payload, key)
  const saved= (payload) => action('SAVED', payload)
  const remove= (payload) => action('REMOVE', payload)
  const removing= (payload, key) => action('REMOVING', payload, key)
  const removed= (payload) => action('REMOVED', payload)

  const error= (action, description) => {
    return {
      ...action,
      isError: true,
      description,
    }
  }

  const errorCreating= (description, key) => error(created({}, key), description)
  const errorSaving= (description, key) => error(saved({}, key), description)
  const errorRemoving= (description, key) => error(removed({}, key), description)

  return {
    loadItems, initialize,
    create, creating, created,
    edit,
    save, saving, saved,
    remove, removing, removed,
    errorCreating, errorSaving, errorRemoving,
  }
}
