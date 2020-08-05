import { useDispatch } from 'react-redux'

let id = Math.floor(Math.random() * 1000);
let counter

export const setNotification = (notification) => {
    // clearTimeout(counter)
    return {
        type: 'NOTIFICATION',
        data: {
            notification: notification,
            id: id,
        }

        // counter = setTimeout(() => {
        //     dispatch({
        //         type: 'CLEAR_NOTIFICATION',
        //         data: {
        //             notification: '',
        //             id: id
        //         }
        //     })
        // }, 5000)
    }
}


const notificationReducer = (state = '', action) => {
    console.log('reducer', action.data)
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data.notification
        case 'CLEAR_NOTIFICATION':
            return state.filter(notif => notif.id !== action.data.id)
        default:
            return state
    }
}

export default notificationReducer