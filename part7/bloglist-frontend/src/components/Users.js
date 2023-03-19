import React from 'react'
import getAllUsers from '../services/users'
import { useState, useEffect } from 'react'

const Users = () => {
  const [allUsers, setAllUsers] = useState([])


  useEffect(() => {
    getAllUsers().then(users => setAllUsers(users))
  }, [])
  console.log(allUsers)

  if (!allUsers) {

    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><h4>blogs created</h4></th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(user => <tr key={user.id}>
            <td>
              {user.username}
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>

  )
}

export default Users
