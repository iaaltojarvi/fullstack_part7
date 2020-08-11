import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const BlogEntry = ({ handlePost }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newObject = {
      title: title,
      author: author,
      url: url
    }
    handlePost(newObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }



  return (
    <form onSubmit={(event) => addBlog(event)}>
      <Typography variant="h6">Create new blog entry</Typography>
      <br></br>
      <TextField id="title" value={title} type="text" onChange={handleTitleChange} label="title" />
      <br></br>
      <TextField id="author" value={author} name="author" type="text" label="author" onChange={handleAuthorChange} />
      <br></br>
      <TextField id="url" value={url} name="url" type="text" label="url" onChange={handleUrlChange} />
      <br></br>
      <br></br>
      <Button id="blog-button" type="submit">Create</Button>
    </form>
  )
}

export default BlogEntry



