import React from 'react'
import { render } from 'react-dom'

import App from './app'

export default function Mount(history, dom) {
  render(
    <App history={history}/>,
    document.getElementById(dom)
  )
}
