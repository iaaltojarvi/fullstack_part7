import React from 'react'
import { useParams } from 'react-router-dom'

const BlogView = ({ blogs, addOneLike }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

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
    </div>
  )
}

export default BlogView































































