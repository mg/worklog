const actionFactory= (name, action, payload, key) => {
  return {
    type: `${action}_${name}`,
    payload,
    key,
  }
}

const initializeFactory= name => {
  return () => {
    return {
      type: `INITIALIZE_${name}`,
    }
  }
}

const errorFactory= (action, description) => {
  return {
    ...action,
    isError: true,
    description,
  }
}

export function internal(name) {
  const creating= payload => actionFactory(name, 'CREATING', payload)
  const created= (payload, key) => actionFactory(name, 'CREATED', payload, key)
  const saving= payload => actionFactory(name, 'SAVING', payload)
  const saved= (payload, key) => actionFactory(name, 'SAVED', payload, key)
  const removing= payload => actionFactory(name, 'REMOVING', payload)
  const removed= (payload, key) => actionFactory(name, 'REMOVED', payload, key)

  const errorCreating= (description, key) => errorFactory(created({}, key), description)
  const errorSaving= (description, key) => errorFactory(saved({}, key), description)
  const errorRemoving= (description, key) => errorFactory(removed({}, key), description)

  return {
    creating, created,
    saving, saved,
    removing, removed,
    errorCreating, errorSaving, errorRemoving,
  }
}

export default function(name) {
  const initialize= initializeFactory(name)
  const loadItems= payload => actionFactory(name, 'LOAD_ITEMS', payload)
  const create= payload => actionFactory(name, 'CREATE', payload)
  const edit= payload => actionFactory(name, 'EDIT', payload)
  const save= (payload, key) => actionFactory(name, 'SAVE', payload, key)
  const remove= payload => actionFactory(name, 'REMOVE', payload)

  return {
    loadItems,
    initialize,
    create,
    edit,
    save,
    remove,
  }
}
