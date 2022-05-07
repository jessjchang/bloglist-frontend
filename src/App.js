import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Home from './components/Home'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, updateBlog, deleteBlog } from './reducers/blogReducer'
import { setUsername, setPassword, setUser, loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import {
  Routes,
  Route,
  Navigate,
  useMatch,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const { message, messageType } = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const { username, password, user } = useSelector(state => state.userDetails)
  const allUsers = useSelector(state => state.allUsers)

  const headerTitle = (user ? 'blog app' : 'log in to application')

  useEffect(async () => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      await dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const notificationDetails = (message, messageType) => {
    return {
      message,
      messageType
    }
  }

  const handleUsernameChange = ({ target }) => dispatch(setUsername(target.value))

  const handlePasswordChange = ({ target }) => dispatch(setPassword(target.value))

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggingUser = await dispatch(loginUser())
      blogService.setToken(loggingUser.token)
    } catch (exception) {
      const details = notificationDetails('wrong username or password', 'danger')
      dispatch(setNotification(details, 5))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await dispatch(createBlog(blogObject))
    const details = notificationDetails(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
    dispatch(setNotification(details, 5))
  }

  const incrementLikes = (blog) => {
    const targetId = blog.id
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    dispatch(updateBlog(targetId, changedBlog))
  }

  const removeBlog = async (blog) => {
    await dispatch(deleteBlog(blog.id))
    const details = notificationDetails(`Blog ${blog.title} by ${blog.author} has been removed`, 'success')
    dispatch(setNotification(details, 5))
  }

  const blogArea = () => (
    <div>
      <Home
        blogFormRef={blogFormRef}
        addBlog={addBlog}
        blogs={blogs}
        user={user}
        incrementLikes={incrementLikes}
        removeBlog={removeBlog}
      />
    </div>
  )

  const userMatch = useMatch('/users/:id')
  const targetUser = userMatch
    ? allUsers.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const targetBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  return (
    <div className="container">
      {user ?
        <Navigation user={user} handleLogout={handleLogout} />
        : ''
      }

      <Header title={headerTitle} />
      <Notification message={message} type={messageType} />

      <Routes>
        <Route path="/" element={user ? blogArea() :
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsername={handleUsernameChange}
            handlePassword={handlePasswordChange}
          />
        } />
        <Route path="/users" element={user ?
          <Users
            allUsers={allUsers}
          />
          : <Navigate replace to="/" />} />
        <Route path="/users/:id" element={user ?
          <User targetUser={targetUser} />
          : <Navigate replace to="/" />} />
        <Route path="/blogs/:id" element={user ?
          <Blog
            currentUser={user}
            blog={targetBlog}
            incrementLikes={incrementLikes}
            removeBlog={removeBlog}
          />
          : <Navigate replace to="/" />} />
      </Routes>
    </div>
  )
}

export default App
