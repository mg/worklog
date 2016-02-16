import React from 'react'
import Radium from 'radium'
import PropTypes from 'react-immutable-proptypes'

import { getItem, isRemoving } from 'store/crud/access'

import Button from './button.jsx'

export class Item extends React.Component {
  static propTypes= {
    item: PropTypes.map.isRequired,
    state: PropTypes.map,
    style: React.PropTypes.object,
    onSelect: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
  }

  render() {
    const { item, state, style, onEdit, onRemove, children }= this.props

    let itemStyle= styles.item
    let linkStyle= styles.link

    if(style !== undefined) {
      itemStyle= {...itemStyle, ...style}
    }

    if(isRemoving(state)) {
      console.log('removing')
      linkStyle= {...linkStyle, ...styles.stateRemoving}
    }

    return (
      <li style={itemStyle}>
        <a href='#' onClick={::this.onClick} style={linkStyle}>
          {children(item)}
        </a>
        <Button onClick={() => onRemove(item)}>clear</Button>
        <Button onClick={() => onEdit(item)}>create</Button>
      </li>
    )
  }

  onClick(e) {
    const { item, onSelect }= this.props
    e.preventDefault()
    onSelect(item)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.state !== this.props.state
   }
}

export default Radium(Item)

const styles= {
  item: {
    display: 'flex',
    padding: 6,

    ':hover': {
      backgroundColor: '#eee',
    }
  },

  link: {
    textDecoration: 'none',
    color: 'black',
    marginRight: 4,
  },

  stateRemoving: {
    color: 'red',
  }
}

// state icons
// retry: cached
// done: done
// remove: clear
// edit: create
// new: add
