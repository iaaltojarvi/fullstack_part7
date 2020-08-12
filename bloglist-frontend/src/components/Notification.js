import React from 'react'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import './Notification.css'

const Notification = () => {
  const notifications = useSelector(state => state.notifications)

  const error = notifications && notifications.map(notif => notif.notification !== null && notif.notification.includes('Error'))[notifications.length - 1]

  if (notifications.length) {
    return (
      <Typography variant="body1" className={error ? 'error' : 'notification'}>
        {notifications[notifications.length - 1].notification}
      </Typography>
    )
  } else {
    return null
  }
}


Notification.propTypes = {
  notification: PropTypes.array
}

export default Notification