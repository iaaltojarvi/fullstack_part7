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

// export const voteAction = (id, content, votes) => {
//   return async dispatch => {
//     const voted = await anecdoteService.update(id, content, votes)
//     dispatch({
//       type: 'VOTE',
//       data: voted
//     })
//   }
// }

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    // case 'VOTE':
    //   const id = action.data.id
    //   const anecdoteToUpdate = state.find(anecdote => anecdote.id === id)
    //   const changedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
    //   let newArr = [...state]
    //   if (anecdoteToUpdate) {
    //     newArr[state.indexOf(anecdoteToUpdate)] = changedAnecdote
    //   }
    //   return newArr
    case 'NEW_BLOG':
      const newList = [...state, action.data]
      return newList
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default blogReducer

