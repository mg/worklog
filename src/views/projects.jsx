import React from 'react'
import Radium from 'radium'

import List from 'widgets/crud/list'

export class Projects extends React.Component {
  render() {
    const { projects }= this.props

    return (
      <div>
        <h4>Projects</h4>
        <List
          items={projects}
          onSelect={item => console.log('select:', item.get('name'))}
          onEdit={item => console.log('edit:', item.get('name'))}
          onRemove={item => console.log('remove:', item.get('name'))}
          onCreate={() => console.log('create')}
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
export default connect(
  state => {
    return {
      projects: state.projects
    }
  },
  {
    // actions
  }
)(Radium(Projects))
