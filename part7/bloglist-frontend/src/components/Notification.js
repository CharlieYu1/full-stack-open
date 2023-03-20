import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const { successMessage, errorMessage } = notification
  if (successMessage === '' && errorMessage === '') {
    return null
  } else if (successMessage) {
    return (
      <Alert id="success" variant="success">
        {successMessage}
      </Alert>
    )
  } else {
    return (
      <Alert id="error" variant="error">
        {errorMessage}
      </Alert>
    )
  }
}

Notification.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
}

export default Notification
