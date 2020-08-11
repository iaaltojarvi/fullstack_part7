export const setCurrentUser = (user) => {
  return {
    type: 'SET_USER',
    user: {
      token: user.token,
      username: user.username,
      name: user.name
    }
  }
}

export const logUserOut = () => {
  console.log('in action')
  return {
    type: 'LOG_OUT',
  }
}

const defaultState = {
  user: {}
}

const userReducer = (state = defaultState, action) => {
  console.log('in reducer', state, action)
  switch (action.type) {
  case 'SET_USER':
    return {
      user: { ...action.user }
    }
  case 'LOG_OUT':
    window.localStorage.clear()
    return { ...state }
  default:
    return state
  }
}

export default userReducer