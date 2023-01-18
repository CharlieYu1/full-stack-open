import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but not url and likes on default', () => {
  const user = {
    id: 'fakeId1234',
    username: 'user1'
  }
  
  const blog = {
    title: 'A New Blog',
    author: 'Charlie Yu',
    url: 'http://example.com',
    likes: 3,
    user: user,
  }
  
  const { container } = render(<Blog blog={blog} user={user} handleLike={jest.fn()} handleDelete={jest.fn()} />)
  const div = container.querySelector('.blog')
  
  expect(div).toHaveTextContent('A New Blog')
  expect(div).toHaveTextContent('Charlie Yu')
  
  expect(div).not.toHaveTextContent('http://example.com')
  expect(div).not.toHaveTextContent(3)
})

test('renders url and likes after clicking show button', async () => {
  const user = {
    id: 'fakeId1234',
    username: 'user1'
  }
  
  const blog = {
    title: 'A New Blog',
    author: 'Charlie Yu',
    url: 'http://example.com',
    likes: 3,
    user: user,
  }
  
  const { container } = render(<Blog blog={blog} user={user} handleLike={jest.fn()} handleDelete={jest.fn()} />)
  const clickingUser = userEvent.setup()
  const button = screen.getByText('show')
  await clickingUser.click(button)
  const div = container.querySelector('.blog')
  
  expect(div).toHaveTextContent('http://example.com')
  expect(div).toHaveTextContent(3)
})