import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event/'

test('<NewBlogForm /> works', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<NewBlogForm createBlog={createBlog} />)

  const input = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')

  await user.type(input[0], 'A New Title')
  await user.type(input[1], 'The Author')
  await user.type(input[2], 'http://example.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({ 'author': 'The Author', 'title': 'A New Title', 'url': 'http://example.com' })
})