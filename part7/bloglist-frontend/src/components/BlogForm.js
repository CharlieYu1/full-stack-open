import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control id="title" value={newTitle} onChange={handleTitleChange} />
        <Form.Label>Author</Form.Label>
        <Form.Control id="author" value={newAuthor} onChange={handleAuthorChange} />
        <Form.Label>Url</Form.Label>
        <Form.Control id="url" value={newUrl} onChange={handleUrlChange} />
        <Button variant="primary" type="submit">add</Button>
      </Form.Group>
    </Form>
  )
}

export default BlogForm
