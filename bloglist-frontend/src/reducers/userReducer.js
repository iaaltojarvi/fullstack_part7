export const setUser = (user) => {
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
  return {
    type: 'LOG_OUT'
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
    localStorage.clear()
    return {
      user: {}
    }
  default:
    return state
  }
}

export default userReducer