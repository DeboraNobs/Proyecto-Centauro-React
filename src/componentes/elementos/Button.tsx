import React from 'react'
import { ButtonProps } from '../../types/types'

function Button({ style, texto, className }: ButtonProps) {
  return (
    <button 
      style={style} 
      className={`btn ${className ? className : ''}`}
      >
        {texto}
    </button>
  );
}

export default Button;