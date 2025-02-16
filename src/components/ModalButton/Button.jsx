import React from 'react'

const Button = (props) => {
  return (
    <button 
    disabled={props.disabled} 
    className={`cursor-pointer btn bg-green-clr rounded-0 py-2 d-flex align-items-center justify-content-center ${props.className ? props.className : "" }`} 
    onClick={props.onClick} style={props.style}>{props.children}</button>
  )
}

export default Button