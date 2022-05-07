import commentsService from '../services/comments'
import CommentForm from './CommentForm'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { ListGroup } from 'react-bootstrap'

const Blog = ({ currentUser, blog, incrementLikes, removeBlog }) => {
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const handleLikes = () => {
    incrementLikes(blog)
  }

  const handleRemoval = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  const addComment = async (blogId, newComment) => {
    const returnedBlog = await commentsService.create(blogId, newComment)
    dispatch(updateBlog(blogId, returnedBlog))
    return returnedBlog
  }

  return (
    <div className='blog-details' id={blog.title}>
      <h2>{blog.title} {blog.author}</h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button id='like-button' onClick={handleLikes}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {currentUser.username === blog.user.username ?
        <button id='remove-button' onClick={handleRemoval}>remove</button> :
        ''}
      <h3>comments</h3>
      <CommentForm blogId={blog.id} createComment={addComment} />
      {blog.comments.length > 0 ?
        <ListGroup variant="flush">
          {blog.comments.map(comment =>
            <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
          )}
        </ListGroup>
        : <div>No comments</div>
      }
    </div>
  )
}

export default Blog