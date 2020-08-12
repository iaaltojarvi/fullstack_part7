import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CommentIcon from '@material-ui/icons/Comment'

const BlogView = ({ blogs, addOneLike }) => {

  const id = useParams().id

  const blog = blogs.find(b => b.id === id)
  const comments = blog && blog.comments ? blog.comments : []

  const [comment, setComment] = useState('')
  const [allComments, setAllComments] = useState(comments)

  useEffect(() => {
    if (comments.length) {
      setAllComments(comments)
    }
  }, [comments])

  const addComment = (event, id) => {
    event.preventDefault()
    const newObject = {
      content: comment
    }
    try {
      blogService.createComment(newObject, id)
      setComment('')
      setAllComments([...allComments.concat(newObject)])
    } catch (err) {
      console.log(`Problem in posting comment: ${err.message}`)
    }

  }

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  if (!blog) {
    return null
  }

  const onLike = (blog) => {
    blog.likes += 1
    addOneLike(blog)
  }

  console.log(allComments.length && allComments.map(c => c.id))

  return (
    <div>
      <Typography variant="h6">{blog.title}</Typography>
      <br></br>
      <Typography variant="body1">{`Added by ${blog.author}`}</Typography>
      <br></br>
      <Typography variant="body1">{blog.url}</Typography>
      <br></br>
      <div style={{ display: 'flex' }}>
        <Typography variant="body1">{`${blog.likes} likes`}</Typography>
        <Button variant="contained" style={{ backgroundColor: 'white', marginLeft: 20, marginTop: -5 }} onClick={() => onLike(blog)}>Like</Button>
      </div>
      <Typography style={{ fontWeight: 'bold', marginTop: 50 }} variant="body1">Comments</Typography>
      <form onSubmit={(event) => addComment(event, blog.id)}>
        <TextField id="comment" value={comment} type="text" label="Type your comment" onChange={handleChange} />
        <br></br>
        <br></br>
        <Button variant="contained" style={{ backgroundColor: 'white' }} id="comment-button" type="submit">Comment</Button>
        <br></br>
        <br></br>
      </form>
      <List>
        {allComments.length ? allComments.map(c =>
          <ListItem key={c.id} >
            <ListItemIcon>
              <CommentIcon></CommentIcon>
            </ListItemIcon>
            <ListItemText>{c.content}</ListItemText>
          </ListItem>
        ) : null}
      </List>
    </div>
  )
}

export default BlogView































































