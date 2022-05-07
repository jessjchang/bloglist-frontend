import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, type }) => {
  if (message === '') {
    return null
  }

  return (
    <Alert variant={type} className={type}>
      {message}
    </Alert>
  )
}

export default Notification