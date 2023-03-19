import React from 'react'
import { useState, useEffect } from 'react'
import { getUserById } from '../services/users'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState()
  useEffect(() => {
    getUserById(id).then(user => setUser(user))
  }, [id])

  if (!user) {
    return null
  }

  return (
    <div>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => {
          return (
            <Link to={`/blogs/${blog.id}`} key={blog.id}>
              <li>{blog.title}</li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default User
