import React from 'react'
import Radium from 'radium'
import PropTypes from 'react-immutable-proptypes'

import { getItem } from 'store/crud/access'

export class Item extends React.Component {
  static propTypes= {
    item: PropTypes.map.isRequired,
    state: PropTypes.map,
    style: React.PropTypes.object,
  }

  render() {
    const { item, state, style, children }= this.props

    let itemStyle= styles.item
    if(style !== undefined) {
      itemStyle= {...itemStyle, ...style}
    }
    
    return (
      <li style={itemStyle}>
        {children(item)}
      </li>
    )
  }
}

export default Radium(Item)

const styles= {
  item: {
    display: 'flex',
  }
}
