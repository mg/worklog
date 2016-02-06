import { actionsFactory, reducerFactory } from './crud'

const crudActions= actionsFactory('PROJECT')
const crudReducer= reducerFactory('PROJECT')

export default {
  actions: crudActions,
  reducer: crudReducer,
}
