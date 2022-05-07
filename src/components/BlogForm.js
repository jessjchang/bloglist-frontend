import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleTitleChange = (event) => {
    let adjusted = { ...newBlog, title: event.target.value }
    setNewBlog(adjusted)
  }

  const handleAuthorChange = (event) => {
    let adjusted = { ...newBlog, author: event.target.value }
    setNewBlog(adjusted)
  }

  const handleUrlChange = (event) => {
    let adjusted = { ...newBlog, url: event.target.value }
    setNewBlog(adjusted)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }

    createBlog(blogObject)

    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            value={newBlog.title}
            onChange={handleTitleChange}
            id='title-input'
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            value={newBlog.author}
            onChange={handleAuthorChange}
            id='author-input'
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            value={newBlog.url}
            onChange={handleUrlChange}
            id='url-input'
          />
          <Button variant="primary" id='create-blog-button' type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm