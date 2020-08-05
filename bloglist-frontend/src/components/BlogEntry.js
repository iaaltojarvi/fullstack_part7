import React, { useState } from 'react'

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
      Create new blog entry
      <br></br>
      Title
      <input id="title" value={title} type="text" onChange={handleTitleChange} />
      <br></br>
      Author
      <input id="author" value={author} name="author" type="text" onChange={handleAuthorChange} />
      <br></br>
      Url
      <input id="url" value={url} name="url" type="text" onChange={handleUrlChange} />
      <br></br>
      <br></br>
      <button id="blog-button" type="submit">Create</button>
    </form>
  )
}

export default BlogEntry



