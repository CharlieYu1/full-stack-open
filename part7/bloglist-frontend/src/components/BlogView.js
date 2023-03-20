import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { updateBlog, deleteBlog, addCommentToBlog } from '../reducers/blogsReducer'

const BlogView = () => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const match = useMatch('/blogs/:id')
  const id = match.params.id
  const allBlogs = useSelector(state => state.blogs)
  const blog = allBlogs.filter(blog => blog.id === id)[0]
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

  const handleCommentChange = () => {
    setComment(event.target.value)
  }

  const addComment = () => {
    event.preventDefault()
    dispatch(addCommentToBlog(blog.id, comment))
    setComment('')
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
      <h4>comments</h4>
      <form onSubmit={addComment}>
        <input value={comment} onChange={handleCommentChange} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => <li key={i}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default BlogView
