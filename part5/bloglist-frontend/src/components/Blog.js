import React from 'react'
import { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'

const Blog = forwardRef((props) => {
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

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button className="showButton" onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      {visible ? <div>
        {blog.url}<br/>
        likes: {blog.likes} <button className="likeButton" onClick={() => handleLike(blog)}>like</button><br/>
        {blog.user.username}<br/>
        {blog.user.username === props.user.username ? <button onClick={() => handleDelete(blog)}>delete</button> : null}
      </div> : null}
    </div>
  )
})

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

Blog.displayName = 'Blog'

export default Blog