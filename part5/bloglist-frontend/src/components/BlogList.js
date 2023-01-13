import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, handleLike }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      )}
    </div>
  )
}

export default BlogList