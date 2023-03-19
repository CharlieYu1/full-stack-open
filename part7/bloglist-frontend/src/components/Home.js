import React from 'react'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'

const Home = () => {
  const allBlogs = useSelector(state => state.blogs)

  const blogFormRef = React.createRef()
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef}/>
      </Togglable>
      {allBlogs && allBlogs.slice().sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default Home
