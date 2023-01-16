import React from 'react'

const Notification = ({ message }) => {

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    'fontSize': '20px',
    'borderStyle': 'solid',
    'borderRadius': '5px',
    'padding': '10px',
    'marginBottom': '10px,'
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    'fontSize': '20px',
    'borderStyle': 'solid',
    'borderRadius': '5px',
    'padding': '10px',
    'marginBottom': '10px,'
  }

  return (
    <div style={message.includes('failed') ? errorStyle : successStyle}>{message}</div>
  )
}

export default Notification