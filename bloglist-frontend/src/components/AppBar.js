import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const TopAppBar = ({ logout, user }) => {

  const nav = {
    marginRight: 20,
    color: 'black'
  }

  const button = {
    backgroundColor: 'white'
  }

  return (
    <AppBar position="absolute" style={{ width: '100%', backgroundColor: 'honeydew' }}>
      <Toolbar>
        <Typography style={nav} variant="h5"><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Blogs</Link></Typography>
        <Typography style={nav} variant="h5"><Link style={{ textDecoration: 'none', color: 'black' }} to='/users'>Users</Link></Typography>
        <Typography style={nav} variant="subtitle1">{`'${user.user && user.user.name}' logged in`}</Typography>
        <Button style={button} variant="contained" size="small" onClick={() => logout()}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopAppBar