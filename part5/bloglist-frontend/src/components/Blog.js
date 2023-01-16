import React from 'react'
import { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'

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
  const handleDelete = props.handleDelete
  
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
        {blog.user.username === props.user.username ? <button onClick={() => handleDelete(blog)}>delete</button> : null}
      </div>
    </div>
  )
})

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog