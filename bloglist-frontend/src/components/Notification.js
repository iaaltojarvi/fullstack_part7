import React from 'react'
import PropTypes from 'prop-types'
import './Notification.css'

const Notification = ({ notification, errorMessage }) => {
  if (notification === null && errorMessage === null) {
    return null
  }
  if (errorMessage !== null) {
    return (
      < div className="error">
        {errorMessage}
      </div>
    )
  }
  if (notification !== null) {
    return (
      <div className="notification">
        {notification}
      </div>
    )
  }
}

Notification.propTypes = {
  notification: PropTypes.string,
  errorMessage: PropTypes.string
}

export default Notification