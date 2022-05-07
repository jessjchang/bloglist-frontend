import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'Test title',
      author: 'Test author',
      url: 'http://test.com',
      user: {
        username: 'testUsername',
        name: 'Test user',
      }
    }

    const currentUser = {
      username: 'testUsername',
      name: 'Test user',
    }

    mockHandler = jest.fn()

    container = render(
      <Blog blog={blog} incrementLikes={mockHandler} currentUser={currentUser} />
    ).container
  })

  test('renders only title and author by default', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Test title'
    )
    expect(div).toHaveTextContent(
      'Test author'
    )
    expect(div).not.toHaveTextContent(
      'http://test.com'
    )
    expect(div).not.toHaveTextContent(
      'likes'
    )
  })

  test('clicking the view button displays url and likes', () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Test title'
    )
    expect(div).toHaveTextContent(
      'Test author'
    )
    expect(div).toHaveTextContent(
      'http://test.com'
    )
    expect(div).toHaveTextContent(
      'likes'
    )
  })

  test('clicking the like button twice calls event handler twice', () => {
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
