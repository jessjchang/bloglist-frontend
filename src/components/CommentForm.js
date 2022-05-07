import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ blogId, createComment }) => {
  const [newComment, setNewComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()

    createComment(blogId, newComment)

    setNewComment('')
  }

  return (
    <Form onSubmit={addComment}>
      <Form.Control
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button variant="primary" type="submit">add comment</Button>
    </Form>
  )
}

export default CommentForm