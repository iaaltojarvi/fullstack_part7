import React from 'react'

const Notification = ({ message }) => {
    const style = {
        border: '1px solid black',
        padding: 10
    }
    if (!message) {
        return null
    } else {
        return (
            <div style={style} className="notification">
                {message}
            </div>
        )
    }
}

export default Notification