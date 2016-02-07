import React from 'react'
import { render } from 'react-dom'

import App from './app'

export default function Mount(history, dom, initStore) {
  render(
    <App history={history} initStore={initStore}/>,
    document.getElementById(dom)
  )
}
