import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogEntry from './components/BlogEntry'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'

const App = () => {

  const dispatch = useDispatch()
  const notifications = useSelector(state => state)

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(false)
  const [liked, setLiked] = useState(false)

  const blogEntryRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        const sorted = blogs.sort(function (a, b) {
          return b.likes - a.likes
        })
        setBlogs(sorted)
      })
  }, [])

  useEffect(() => {
    if (newBlog || liked) {
      blogService.getAll()
        .then(blogs => {
          const sorted = blogs.sort(function (a, b) {
            return b.likes - a.likes
          })
          setBlogs(sorted)
        })
    }
    setLiked(false)
  }, [newBlog, liked])

  const addOneLike = (blog) => {
    setLiked(true)
    blogService
      .update(blog.id, blog)
      .then(returnedBlog => {
        dispatch(setNotification(`You liked '${returnedBlog.title}'`))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
      })
      .catch(error => {
        console.log(`Error in updating likes: ${error.message}`)
        dispatch(setNotification('Error: Could not like, try again later'))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
      })
  }

  const remove = (id) => {
    if (window.confirm('Do you really want to delete the blog?')) {
      blogService
        .remove(id)
        .then(returnedBlog => {
          dispatch(setNotification('You removed the blog'))
          setBlogs(blogs.filter(blog => blog.id !== id))
          setTimeout(() => {
            dispatch(setNotification(null))
          }, 5000)
        })
        .catch(error => {
          console.log(`Error in remove: ${error.message}`)
          dispatch(setNotification('Error: Could not remove, try again later'))
          setTimeout(() => {
              dispatch(setNotification(null))
          }, 5000)
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification('Error: Wrong credentials'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handlePost = (newObject) => {
    blogEntryRef.current.toggleVisibility()
    blogService.create(newObject)
      .then(returnedBlog => {
        setNewBlog(true)
        dispatch(setNotification(`A new blog: '${returnedBlog.title}'  by  '${returnedBlog.author}'  added`))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
        setNewBlog(false)
      })
      .catch(error => {
        console.log(`Error in post: ${error.message}`)
        dispatch(setNotification('Error: Please provide all the fields correctly'))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
      })
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
      {`'${user.name}' logged in`}
      <br></br>
      <button onClick={() => logout()}>Logout</button>
      <br></br>
      <br></br>
      <Togglable buttonLabel="Add new blog" ref={blogEntryRef}>
        <BlogEntry handlePost={handlePost} />
      </Togglable>
      <br></br>
      <h2>Blogs</h2>
      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} remove={remove} user={user} addOneLike={addOneLike} />
      )}
    </div>
  )

  return (
    <div>
      <Notification notification={notifications}/>
      {user === null ? loginForm() : allBlogs()}
    </div>
  )
}

export default App