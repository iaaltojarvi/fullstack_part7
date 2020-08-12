export const setCurrentUser = (user) => {
  return {
    type: 'SET_USER',
    user: {
      loggedIn: true,
      token: user.token,
      username: user.username,
      name: user.name
    }
  }
}

export const logUserOut = () => {
  return {
    type: 'LOG_OUT',
    user: {
      loggedIn: false
    }
  }
}

const defaultState = {
  user: {}
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return {
      user: { ...action.user }
    }
  case 'LOG_OUT':
    return {
      user: { ...action.user }
    }
  default:
    return state
  }
}

export default userReducer