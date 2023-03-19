import React from 'react'
import { useState, useEffect } from 'react'
import { getUserById } from '../services/users'
import { useParams } from 'react-router'

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
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User
