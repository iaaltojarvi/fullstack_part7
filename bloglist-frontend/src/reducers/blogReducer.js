/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeAction = (id, blog, likes) => {
  return async dispatch => {
    const liked = await blogService.update(id, blog, likes)
    console.log('liked in action', liked)
    dispatch({
      type: 'LIKE',
      data: liked
    })
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_ALL_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_ALL_BLOGS':
    return [...action.data]
  case 'REMOVE_BLOG':
    const id = action.data
    const deletedBlog = state.find(blog => blog.id === id)
    const remaining = state.filter(blog => blog.id !== deletedBlog.id)
    return remaining
  case 'LIKE':
    const idInLike = action.data.id
    const likedBlog = state.find(blog => blog.id === idInLike)
    let modifiedArr = [...state]
    const index = modifiedArr.indexOf(likedBlog)
    modifiedArr[index] = likedBlog
    return modifiedArr
  case 'NEW_BLOG':
    return [...state, action.data]
  default:
    return state
  }
}

export default blogReducer

