import React from 'react'

const UserDetail = ({ username, handleLogout }) => {
  return (
    <div>
        {username} logged in
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserDetail