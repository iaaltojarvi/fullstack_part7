import React from 'react'
import { Link } from 'react-router-dom'

const UsersView = ({ allUsers }) => {
  allUsers = allUsers.flat()

  const padding = {
    paddingRight: 30
  }
  const align = {
    textAlign: 'left'
  }
  return (
    <div>
      <h4>USERS</h4>
      <table>
        <thead style={align}>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {allUsers && allUsers.map(u =>
            <tr key={u.id}>
              <td style={padding}><Link to={`/users/${u.id}`}>{u.name}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>

          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView































































