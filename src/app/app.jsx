import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import routes from './routes.jsx'
import store from './store.js'

export class App extends React.Component {
  static defaultProps= {
    initStore: store => store,
    storeMiddlewares: [],
  }

  render() {
    const { history, initStore, storeMiddlewares }= this.props

    return (
      <Provider store={initStore(store(storeMiddlewares))}>
      	<Router history={history} routes={routes} />
      </Provider>
    )
  }
}

export default App
