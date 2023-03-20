import React from 'react'
import { getAllUsers } from '../services/users'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const [allUsers, setAllUsers] = useState([])


  useEffect(() => {
    getAllUsers().then(users => setAllUsers(users))
  }, [])

  if (!allUsers) {

    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <Table stripped="true">
        <thead>
          <tr>
            <th></th>
            <th><h6>blogs created</h6></th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(user => <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>)}
        </tbody>
      </Table>
    </div>

  )
}

export default Users
