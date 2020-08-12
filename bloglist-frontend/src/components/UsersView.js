import React from 'react'
import { Link } from 'react-router-dom'
import  Typography from '@material-ui/core/Typography'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'


const UsersView = ({ allUsers }) => {
  allUsers = allUsers.flat()

  return (
    <div>
      <Typography style={{ marginBottom: 30 }} variant="h6">USERS</Typography>
      <table>
        <thead style={{ textAlign: 'left' }}>
          <tr>
            <th style={{ height: 40 }}><Typography variant="body1" style={{ fontWeight: 'bold' }}>Username</Typography></th>
            <th style={{ height: 40 }}><Typography variant="body1" style={{ fontWeight: 'bold' }}>Blogs created</Typography></th>
          </tr>
        </thead>
        <tbody>
          {allUsers && allUsers.map(u =>
            <tr key={u.id}>
              <td style={{ paddingRight: 30, height: 40 }}><Link to={`/users/${u.id}`} style={{ textDecoration: 'none', color:  'black' }}><Typography variant="body1"><ArrowForwardIcon style={{ width: 15, marginBottom: -5, marginRight: 10 }}></ArrowForwardIcon>{u.name}</Typography></Link></td>
              <td style={{ height: 40 }}><Typography variant="body1">{u.blogs.length}</Typography></td>
            </tr>

          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView































































