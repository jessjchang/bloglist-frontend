import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const sortBlogs = (blogs) => {
  return blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
      return sortBlogs(state)
    },
    setBlogs(state, action) {
      return sortBlogs(action.payload)
    }
  }
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blogInfo => {
  return async dispatch => {
    const newBlog = await blogService.create(blogInfo)
    dispatch(appendBlog(newBlog))
    return newBlog
  }
}

export const updateBlog = (targetId, updatedInfo) => {
  return async (dispatch, getState) => {
    const updatedBlog = await blogService.update(targetId, updatedInfo)
    const newBlogs = getState().blogs.map(b => b.id !== targetId ? b : updatedBlog)
    dispatch(setBlogs(newBlogs))
  }
}

export const deleteBlog = targetId => {
  return async (dispatch, getState) => {
    const newBlogs = getState().blogs.filter(b => b.id !== targetId)
    dispatch(setBlogs(newBlogs))
  }
}

export default blogSlice.reducer