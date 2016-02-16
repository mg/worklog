import { actionsFactory, reducerFactory, sagasFactory } from './crud'

const identifier= 'PROJECT'
const crudActions= actionsFactory(identifier)
const crudReducer= reducerFactory(identifier)
const crudSagas= sagasFactory(identifier, {
  create: item => console.log(item),
  save: item => console.log(item),
  remove: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 500)
    })
  },
})

export default {
  actions: crudActions,
  reducer: crudReducer,
  sagas: crudSagas,
}
