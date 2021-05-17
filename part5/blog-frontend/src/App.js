import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import "./app.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [classn, setClassn] = useState('')
  const [createNoteVisible, setCreateNotVisible] = useState(false)

  const fetchData = async () => {
    const response = await blogService.getAll()
    response.sort((a, b) => b.likes - a.likes)
    setBlogs(response)
  }

  // const blogRef = useRef()

  // useEffect(() => {
  //   fetchData()
  // }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    console.log('logout called')
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleLogin = async (loginObject) => {

    try {
      const user = await loginService.login(loginObject)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      fetchData()

    } catch (exception) {
      console.error(exception.message)
      setMessage("wrong username or password")
      setClassn("error")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      console.log(response)
      setBlogs(blogs.concat(response))
      setMessage(`a new blog was added`)
      setClassn("success")
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (error) {
      console.error(error.message)
      setMessage(error.message)
      setClassn("error")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const updateBlog = async (updatedObject) => {
    try {
      const response = await blogService.update(updatedObject.id, updatedObject)
      setBlogs(blogs.map(b => b.id !== updatedObject.id ? b : response)
        .sort((a, b) => b.likes - a.likes))
    } catch (error) {
      console.error(error.message)
    }
  }

  const removeBlog = async (id) => {
    window.confirm(`remove selected blog`)
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(b => b.id !== id))
    } catch (error) {
      console.error(error.message)
    }
  }

  const blogForm = () => {
    const hideWhenVisible = { display: createNoteVisible ? 'none' : '' }
    const showWhenVisible = { display: createNoteVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateNotVisible(true)}>create blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog} />
          <button onClick={() => setCreateNotVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} classn={classn} />
      {user === null ?
        <LoginForm doLogin={handleLogin} /> :
        <div>
          <h2>blogs</h2>
          {blogForm()}
          <br />
          {user.name} logged in <button onClick={() => handleLogout()}>logout</button>
          <br />
          <br />
          {blogs.map(blog =>
            <Blog key={blog.id}
              blog={blog}
              handleLike={updateBlog}
              handleDelete={removeBlog}
              user={user}
            />
          )}
        </div>
      }

    </div>
  )
}

export default App