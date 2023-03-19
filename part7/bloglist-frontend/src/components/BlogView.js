import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'

const BlogView = () => {
  const dispatch = useDispatch()

  const match = useMatch('/blogs/:id')
  const id = match.params.id
  const allBlogs = useSelector(state => state.blogs)
  console.log('allBlogs', allBlogs)
  const blog = allBlogs.filter(blog => blog.id === id)[0]
  console.log('blog', blog)
  if (!blog) {
    return null
  }

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateBlog(updatedBlog))
  }

  const removeBlog = () => {
    dispatch(deleteBlog(blog))
  }


  return (
    <div className="blog">
      <div>
        <p>
          {blog.title} - {blog.author}{' '}
        </p>
      </div>
      <div>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>
          {blog.likes}{' '}
          <button id="like-button" onClick={increaseLikes}>
            like
          </button>
        </p>
      </div>
      <button id="remove" onClick={removeBlog}>
        remove
      </button>
    </div>
  )
}

export default BlogView
