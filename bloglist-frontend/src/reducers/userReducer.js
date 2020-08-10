import userService from '../services/users'

export const getUsersData = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export const setUser = (user) => {
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
    type: 'LOG_OUT'
  }
}

const defaultState = {
  user: {}
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'GET_USERS':
    return [action.data]
  case 'SET_USER':
    return {
      loggedIn: true,
      user: { ...action.user }
    }
  case 'LOG_OUT':
    localStorage.clear()
    return {
      loggedIn: false,
      user: {}
    }
  default:
    return state
  }
}

export default userReducer