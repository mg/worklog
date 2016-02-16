import React from 'react'
import Radium from 'radium'

import List from 'widgets/crud/list'

export class Projects extends React.Component {
  render() {
    const { projects, create, edit, remove }= this.props

    return (
      <div>
        <h4>Projects</h4>
        <List
          items={projects}
          onSelect={item => console.log('select:', item.get('name'))}
          onCreate={create}
          onEdit={edit}
          onRemove={remove}
          >
          {project => {
            return (
              <div>
                {project.get('name')}
              </div>
            )
          }}
        </List>
      </div>
    )
  }
}

// connect actions and state
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../store/project'
export default connect(
  state => {
    return {
      projects: state.projects
    }
  },
  dispatch => bindActionCreators({
    create: actions.create,
    edit: actions.edit,
    remove: actions.remove,
  }, dispatch)
)(Radium(Projects))
