import React from 'react'
import { render } from 'react-dom'

import App from './app'

export default function Mount(history, dom, initStore, storeMiddlewares, devTools) {
  render(
    <App
      history={history}
      initStore={initStore}
      storeMiddlewares={storeMiddlewares}
      devTools={devTools}
    />,
    document.getElementById(dom)
  )
}
