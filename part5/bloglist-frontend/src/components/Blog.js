import React from 'react'
import { forwardRef, useState } from 'react'

const Blog = forwardRef((props, ref) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blog = props.blog
  const [visible, setVisible] = useState(false)
  const handleLike = props.handleLike
  
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button><br/>
        {blog.user.username}<br/>
      </div>
    </div>
  )
})

export default Blog