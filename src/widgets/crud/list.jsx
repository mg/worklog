import React from 'react'
import Radium from 'radium'
import PropTypes from 'react-immutable-proptypes'

import {
  getItem, isInitializing, isEditing, isCreating, isSaving, isRemoving,
} from 'store/crud/access'

import Item from './item.jsx'

export class List extends React.Component {
  static propTypes= {
    items: PropTypes.map,
    style: React.PropTypes.object,
    itemStyle: React.PropTypes.object,
  }

  render() {
    const { items, style, itemStyle, children }= this.props

    if(items === undefined) {
      return null
    }

    let listStyle= styles.list
    if(style !== undefined) {
      listStyle= {...listStyle, ...style}
    }

    return (
      <ul style={listStyle}>
        {items.map(
          (item, key) =>
            <Item
              key={key}
              item={getItem(item)}
              state={item}
              style={itemStyle}
              >
              {children}
            </Item>
        ).toArray()}
      </ul>
    )
  }
}

export default Radium(List)

const styles= {
  list: {
    margin: 0,
    padding: 0,
  }
}
