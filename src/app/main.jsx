import React from 'react'

export class Main extends React.Component {
  render() {
    return (
      <div>
        <h3>Worklog</h3>
        {this.props.children}
      </div>
    )
  }
}

export default Main
