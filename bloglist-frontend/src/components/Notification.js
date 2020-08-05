import React from 'react'
import PropTypes from 'prop-types'
import './Notification.css'

const Notification = ({ notification }) => {
  const error = notification && notification.includes('Error')
  if (!notification) {
    return null
  }
  return (
    <div className={error ? "error" : "notification"}>
      {notification}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.string
}

export default Notification