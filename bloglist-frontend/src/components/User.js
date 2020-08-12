import React from 'react'
import { useParams } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import LensIcon from '@material-ui/icons/Lens'

const User = ({ allUsers }) => {
  allUsers = allUsers.flat()
  const id = useParams().id
  const user = allUsers.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: 20 }}>Added blogs</Typography>
      <List>
        {user.blogs.map(blog =>
          <ListItem key={blog.id}>
            <ListItemIcon>
              <LensIcon style={{ width: 8 }}></LensIcon>
            </ListItemIcon>
            <ListItemText>{blog.title}</ListItemText>
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default User































































