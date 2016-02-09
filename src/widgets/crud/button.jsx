import React from 'react'
import Radium from 'radium'
export const Button= ({style, onClick, children}) =>
  <button style={{...styles.button, ...style}} onClick={onClick}>
    {children}
  </button>

export default Radium(Button)

const styles= {
  button: {
    backgroundColor: 'white',

    borderColor: '#eee',
    borderWidth: 1,
    borderShadow: 'none',
    borderStyle: 'solid',
    borderRadius: 2,
    outline: 'none',

    cursor: 'pointer',

    fontFamily: 'Material Icons',
    fontStyle: 'normal',
    fontWeight: 400,
    fontFeatureSettings: '\'liga\'',
    WebkitFontFeatureSettings: '\'liga\'',

    ':hover': {
      borderColor: 'black',
    }
  }
}
