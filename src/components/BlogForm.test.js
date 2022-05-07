import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const content = render(<BlogForm createBlog={createBlog} />).container

  const titleInput = content.querySelector('#title-input')
  const authorInput = content.querySelector('#author-input')
  const urlInput = content.querySelector('#url-input')
  const sendButton = screen.getByText('create')

  userEvent.type(titleInput, 'Test title')
  userEvent.type(authorInput, 'Test author')
  userEvent.type(urlInput, 'Test url')
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test author')
  expect(createBlog.mock.calls[0][0].url).toBe('Test url')
})