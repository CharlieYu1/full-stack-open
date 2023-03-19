import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = (props) => {
  const blog = props.blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div key={blog.id} style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}>
        <div>
          <p>
            {blog.title} - {blog.author}{' '}
          </p>
        </div>
      </Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
