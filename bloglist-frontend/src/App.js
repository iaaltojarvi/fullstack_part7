import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogEntry from './components/BlogEntry'
import Togglable from './components/Togglable'
import UsersView from './components/UsersView'
import User from './components/User'
import BlogView from './components/BlogView'
import Login from './components/Login'
import TopAppBar from './components/AppBar'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { getAllBlogs, addBlog, likeAction } from './reducers/blogReducer'
import { setCurrentUser, logUserOut } from './reducers/userReducer'
import { getUsersData } from './reducers/usersReducer'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Divider from '@material-ui/core/Divider'

const App = () => {
  const dispatch = useDispatch()
  let blogs = useSelector(state => state.blogs)
  let users = useSelector(state => state.users)
  let user = useSelector(state => state.currentUser)

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

  // const remove = (id) => {
  //   if (window.confirm('Do you really want to delete the blog?')) {
  //     try {
  //       dispatch(removeBlog(id))
  //       dispatch(setNotification('You removed the blog'))
  //     } catch (error) {
  //       console.log(`Error in remove: ${error.message}`)
  //       dispatch(setNotification('Error: Could not remove, try again later'))
  //     }
  //   }
  // }

  const handleLogin = async (username, password) => {
    try {
      const userToLogIn = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userToLogIn)
      )
      dispatch(setCurrentUser(userToLogIn))
      blogService.setToken(user.user.token)
    } catch (error) {
      dispatch(setNotification('Error: Wrong credentials'))
    }
  }

  const logout = () => {
    dispatch(logUserOut())
    window.localStorage.clear()
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

  const allBlogs = () => (
    <div>
      <Togglable buttonLabel="Add new blog" ref={blogEntryRef}>
        <BlogEntry handlePost={handlePost} />
      </Togglable>
      <br></br>
      <Typography variant="h4">Blogs</Typography>
      <List>
        {blogs && blogs.map(blog =>
          <div key={blog.id}>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon></ArrowForwardIcon>
              </ListItemIcon>
              <ListItemText>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${blog.id}`}><Blog blog={blog} user={user.user} addOneLike={addOneLike} /></Link>
              </ListItemText>
            </ListItem>
            <Divider></Divider>
          </div>
        )}
      </List>
    </div>
  )

  return (
    <Router>
      {!user.user.loggedIn ? null : <TopAppBar logout={logout} user={user} />}
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
            {user.user.loggedIn ? allBlogs() : <Login handleLogin={handleLogin} />}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App