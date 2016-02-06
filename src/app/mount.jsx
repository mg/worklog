import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'

import routes from 'app/routes.jsx'

export default function Mount(history, dom) {
  render(
    <Router history={history} routes={routes} />,
    document.getElementById(dom)
  )
}
