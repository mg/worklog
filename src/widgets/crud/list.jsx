import React from 'react'
import Radium from 'radium'
import PropTypes from 'react-immutable-proptypes'

import {
  getItem, isInitializing, isEditing, isCreating, isSaving, isRemoving,
} from 'store/crud/access'

import Button from './button.jsx'
import Item from './item.jsx'

export class List extends React.Component {
  static propTypes= {
    items: PropTypes.map,
    style: React.PropTypes.object,
    itemStyle: React.PropTypes.object,

    onSelect: React.PropTypes.func,
    onCreate: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
  }

  render() {
    const { items, style, itemStyle, onSelect, onCreate, onEdit, onRemove, children }= this.props

    if(items === undefined) {
      return null
    }

    let listStyle= styles.list
    if(style !== undefined) {
      listStyle= {...listStyle, ...style}
    }

    return (
      <div style={styles.container}>
        <ul style={listStyle}>
          {items.map(
            (item, key) =>
              <Item
                key={key}
                item={getItem(item)}
                state={item}
                style={itemStyle}
                onSelect={onSelect}
                onEdit={onEdit}
                onRemove={onRemove}
                >
                {children}
              </Item>
          ).toArray()}
        </ul>
        <div style={styles.buttonPanel}>
          <Button style={styles.button} onClick={onCreate}>
            add
          </Button>
        </div>
      </div>
    )
  }
}

export default Radium(List)

const styles= {
  container: {
    display: 'inline-block'
  },

  list: {
    margin: 0,
    padding: 0,
    display: 'inline-block'
  },

  buttonPanel: {
    display: 'flex',
    justifyContent: 'center',
  },

  button: {
    padding: '5px 40px',
  }
}
