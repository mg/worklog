export default function(name, ) {
  const action= (prefix, payload) => {
    return {
      type: `${prefix}_${name}`,
      payload,
    }
  }

  const initialize= () => {
    return {
      type: `INITIALIZE_${name}`,
    }
  }

  const create= (payload) => action('CREATE', payload)
  const creating= (payload) => action('CREATING', payload)
  const created= (payload) => action('CREATED', payload)
  const edit= (payload) => action('EDIT', payload)
  const save= (payload) => action('SAVE', payload)
  const saving= (payload) => action('SAVING', payload)
  const saved= (payload) => action('SAVED', payload)
  const remove= (payload) => action('REMOVE', payload)
  const removing= (payload) => action('REMOVING', payload)
  const removed= (payload) => action('REMOVED', payload)

  return {
    initialize,
    create, creating, created,
    edit,
    save, saving, saved,
    remove, removing, removed,
  }
}
