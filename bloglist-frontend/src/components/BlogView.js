import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'

const BlogView = ({ blogs, addOneLike }) => {

  const id = useParams().id

  const blog = blogs.find(b => b.id === id)
  const comments = blog && blog.comments ? blog.comments : []

  const [comment, setComment] = useState('')
  const [allComments, setAllComments] = useState([])

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

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <span>{`${blog.likes} likes`}</span>
      <button onClick={() => onLike(blog)}>Like</button>
      <p>{`Added by ${blog.author}`}</p>
      <h4>Comments</h4>
      <form onSubmit={(event) => addComment(event, blog.id)}>
        <button id="comment-button" type="submit">Comment</button>
        <input id="comment" value={comment} type="text" onChange={handleChange} />
        <br></br>
        <br></br>
      </form>
      {allComments.map(c =>
        <ul key={c.id}>
          <li>{c.content}</li>
        </ul>
      )
      }
    </div>
  )
}

export default BlogView































































