import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogEntry from './components/BlogEntry'
import Togglable from './components/Togglable'
import UsersView from './components/UsersView'
import User from './components/User'
import BlogView from './components/BlogView'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { getAllBlogs, addBlog, likeAction, removeBlog } from './reducers/blogReducer'
import { setCurrentUser, logUserOut } from './reducers/userReducer'
import { getUsersData } from './reducers/usersReducer'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import Divider from '@material-ui/core/Divider'

const App = () => {

  const dispatch = useDispatch()
  let blogs = useSelector(state => state.blogs)
  let users = useSelector(state => state.users)
  let user = useSelector(state => state.currentUser)
  console.log('user state', user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogEntryRef = useRef()

  useEffect(() => {
    dispatch(getUsersData())
    let loggedUser = window.localStorage.getItem('loggedUser')
    loggedUser = JSON.parse(loggedUser)
    if (loggedUser) {
      dispatch(setCurrentUser(loggedUser))
      blogService.setToken(user.user.token)
    }
  }, [dispatch, user.user.token])

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [dispatch])


  const addOneLike = (blog) => {
    try {
      dispatch(likeAction(blog.id, blog, blog.likes))
      dispatch(setNotification(`You liked '${blog.title}'`))
    } catch (error) {
      dispatch(setNotification('Error: Could not like, try again later'))
    }
  }

  const remove = (id) => {
    if (window.confirm('Do you really want to delete the blog?')) {
      try {
        dispatch(removeBlog(id))
        dispatch(setNotification('You removed the blog'))
      } catch (error) {
        console.log(`Error in remove: ${error.message}`)
        dispatch(setNotification('Error: Could not remove, try again later'))
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userToLogIn = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userToLogIn)
      )
      dispatch(setCurrentUser(userToLogIn))
      blogService.setToken(user.user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification('Error: Wrong credentials'))
    }
  }

  const logout = () => {
    dispatch(logUserOut())
  }

  const handlePost = (newObject) => {
    blogEntryRef.current.toggleVisibility()
    if (!newObject.title || !newObject.author || !newObject.url) {
      dispatch(setNotification('Error: Please provide all the fields correctly'))
    } else {
      try {
        dispatch(addBlog(newObject))
        dispatch(setNotification(`A new blog: '${newObject.title}'  by  '${newObject.author}'  added`))
      } catch (error) {
        console.log(`Error in post: ${error.message}`)
        dispatch(setNotification('Error in creating new blog'))
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      Please login
      <br></br>
      <div>
        Username
        <br></br>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <br></br>
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <br></br>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const allBlogs = () => (
    <div>
      <Togglable buttonLabel="Add new blog" ref={blogEntryRef}>
        <BlogEntry handlePost={handlePost} />
      </Togglable>
      <br></br>
      <Typography variant="h4">Blogs</Typography>
      <List>
        {blogs && blogs.map(blog =>
          <>
            <ListItem key={blog.id}>
              <ListItemIcon>
                <FolderOpenIcon></FolderOpenIcon>
              </ListItemIcon>
              <ListItemText>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${blog.id}`}><Blog blog={blog} user={user.user} remove={remove} addOneLike={addOneLike} /></Link>
              </ListItemText>
            </ListItem>
            <Divider />
          </>
        )}
      </List>
    </div>
  )

  const nav = {
    marginRight: 20,
    color: 'black'
  }

  return (
    <Router>
      <AppBar position="absolute" style={{ width: '100%', backgroundColor: 'lightgrey' }}>
        <Toolbar>
          <Typography style={nav} variant="h5"><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Blogs</Link></Typography>
          <Typography style={nav} variant="h5"><Link style={{ textDecoration: 'none', color: 'black' }} to='/users'>Users</Link></Typography>
          <Typography style={nav} variant="subtitle1">{`'${user.user && user.user.name}' logged in`}</Typography>
          <Button style={nav} variant="contained" size="small" onClick={() => logout()}>Logout</Button>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: 100 }}>
        <Notification />
        <Switch>
          <Route path='/users/:id'>
            <User allUsers={users} />
          </Route>
          <Route path='/users'>
            <UsersView allUsers={users} />
          </Route>
          <Route path='/:id'>
            <BlogView blogs={blogs} addOneLike={addOneLike} />
          </Route>
          <Route path='/'>
            {!user.user ? loginForm() : allBlogs()}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App