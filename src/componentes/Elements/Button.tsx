import React from 'react'
import { ButtonProps } from '../../types/types'

function Button({  type = 'button', style, texto, className = "", to }: ButtonProps) { // className tiene un valor por defeco que es btn-primary si no se le pasa nada
  return (
    <button 
        type={type}
        style={style} 
        className={`btn ${className ? className : ''}`}
      >
        {texto}
    </button>
  );
}

export default Button;



