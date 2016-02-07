import React from 'react'
import { render } from 'react-dom'

import App from './app'

export default function Mount(history, dom, initStore, storeMiddlewares) {
  render(
    <App
      history={history}
      initStore={initStore}
      storeMiddlewares={storeMiddlewares}
    />,
    document.getElementById(dom)
  )
}
