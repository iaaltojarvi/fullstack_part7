import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogEntry from './components/BlogEntry'
import Togglable from './components/Togglable'
import UsersView from './components/UsersView'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { getAllBlogs, addBlog, likeAction, removeBlog } from './reducers/blogReducer'
import { setUser, logUserOut } from './reducers/userReducer'
import { getUsersData } from './reducers/usersReducer'

const App = () => {

  const dispatch = useDispatch()
  let blogs = useSelector(state => state.blogs)
  let users = useSelector(state => state.users)
  let user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogEntryRef = useRef()

  useEffect(() => {
    dispatch(getUsersData())
    let loggedUser = window.localStorage.getItem('loggedUser')
    loggedUser = JSON.parse(loggedUser)
    if (loggedUser) {
      dispatch(setUser(loggedUser))
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
      dispatch(setUser(userToLogIn))
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
      <h2>Blogs</h2>
      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user.user} remove={remove} addOneLike={addOneLike} />
      )}
    </div>
  )

  const padding = {
    paddingRight: 15
  }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to='/'>Blogs</Link>
          <Link style={padding} to='/users'>Users</Link>
        </div>
        <br></br>
        {`'${user.user && user.user.name}' logged in`}
        <br></br>
        <button onClick={() => logout()}>Logout</button>
        <br></br>
        <br></br>
        <Switch>
          <Route path='/users'>
            <UsersView allUsers={users} />
          </Route>
          <Route path='/'>
            <Notification />
            {user ? allBlogs() : loginForm()}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App