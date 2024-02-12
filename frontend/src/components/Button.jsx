import React from 'react'
import'../styles/button.css'
function Button({name, onClick}) {
  return (
   <button className='btn' type='submit' onClick={onClick} >{name}</button>
  )
}

export default Button