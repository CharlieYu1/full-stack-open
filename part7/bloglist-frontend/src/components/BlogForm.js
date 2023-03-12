import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      await dispatch(createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      //console.log(error)
    }

  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title:{' '}
        <input id="title" value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        Author:{' '}
        <input id="author" value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        Url: <input id="url" value={newUrl} onChange={handleUrlChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default BlogForm
