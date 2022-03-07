import React from 'react'

const Button = ({label, onclick}) => {
  return (
    <>
      <button onClick={onclick}>{label}</button>
    </>
  )
}

export default Button