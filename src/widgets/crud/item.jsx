import React from 'react'
import Radium from 'radium'
import PropTypes from 'react-immutable-proptypes'

import { getItem } from 'store/crud/access'

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
    if(style !== undefined) {
      itemStyle= {...itemStyle, ...style}
    }

    return (
      <li style={itemStyle}>
        <a href='#' onClick={::this.onClick} style={styles.link}>
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
  }
}

// state icons
// retry: cached
// done: done
// remove: clear
// edit: create
// new: add
