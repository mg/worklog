import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import Main from './main.jsx'

import Projects from '../views/projects'

const routes= (
  <Route path='/' component={Main}>
    <IndexRedirect to='projects'/>
    <Route path='projects' component={Projects} />
  </Route>
)

export default routes
