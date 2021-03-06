const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  let body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'Bad request'
    })
  }
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {

  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    content: request.body.content,
  })

  if (!comment.content) {
    return response.status(401).json({ error: 'No content' })
  }

  try {
    const savedComment = await comment.save()

    blog.comments = blog.comments.concat(savedComment._id)

    await blog.save()

    response.status(201).json(savedComment)

  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const blogger = blog.user.toString()
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (decodedToken.id.toString() === blogger) {
    try {
      await Blog.findByIdAndRemove(request.params.id, { useFindAndModify: false })
      response.status(204).end()
    } catch (error) {
      next(error)
    }
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, useFindAndModify: false })
    response.json(updatedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter