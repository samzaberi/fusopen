import React, { useState } from 'react'
import Togglable from './Toggleable'


const Blog = (props) => {
  const [likes, setLikes] = useState(props.blog.likes)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLike = (event) => {
    const newLike = likes + 1
    const newBlog = {
      ...props.blog,
      likes: newLike
    }
    props.handleLike(newBlog)
    setLikes(newLike)

  }

  const removeBlog = (event) => {
    props.handleDelete(props.blog.id)
  }

  const showRemove = () => {
    if (props.user.id === props.blog.user) {
      return (
        <button onClick={removeBlog} className=".remove-btn">remove</button>
      )
    }
  }

  return (
    <div style={blogStyle} className="blog-details">
      <p className='blogtitle'>{props.blog.title} {props.blog.author}
        <Togglable buttonLabel="view">
          {props.blog.url}
          <br />
          likes {likes}
          <br />
          <button onClick={updateLike} className="like-btn">like blog</button>
          {showRemove()}
        </Togglable>
      </p>
    </div>
  )
}

export default Blog