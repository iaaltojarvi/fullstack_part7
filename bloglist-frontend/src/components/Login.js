import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()
    handleLogin(username, password)
  }

  return (
    <>
      <Typography variant="h4">Please login</Typography>
      <br></br>
      <TextField
        id="username"
        type="text"
        value={username}
        name="Username"
        label='Username'
        onChange={({ target }) => setUsername(target.value)}
      />
      <br></br>
      <TextField
        id="password"
        type="password"
        value={password}
        name="Password"
        label="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <br></br>
      <Button style={{ backgroundColor: 'white', marginTop: 30 }} id="login-button" variant="contained" onClick={(e) => login(e)}>Login</Button>
    </>
  )
}

export default LoginForm