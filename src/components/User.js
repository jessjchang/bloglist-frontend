import { ListGroup } from 'react-bootstrap'

const User = ({ targetUser }) => {
  if (!targetUser) {
    return null
  }

  return (
    <div>
      <h2>{targetUser.name}</h2>
      <h3>added blogs</h3>
      {targetUser.blogs.length > 0 ?
        <ListGroup variant="flush">
          {targetUser.blogs.map(blog =>
            <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
          )}
        </ListGroup>
        : <div>No blogs added</div>
      }
    </div>
  )
}

export default User