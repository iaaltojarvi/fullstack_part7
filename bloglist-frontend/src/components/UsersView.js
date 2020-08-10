import React from 'react'


const UsersView = ({ allUsers }) => {
  allUsers = allUsers.flat()

  const padding = {
    paddingRight: 20
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
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {allUsers && allUsers.map(u =>
            <tr key={u.id}>
              <td style={padding}>{u.name} </td>
              <td>{u.blogs.length}</td>
            </tr>

          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView































































