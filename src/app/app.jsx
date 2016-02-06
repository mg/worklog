import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import routes from './routes.jsx'
import store from './store.js'

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      	<Router history={this.props.history} routes={routes} />
      </Provider>
    )
  }
}

export default App
