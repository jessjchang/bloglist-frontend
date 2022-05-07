import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { ListGroup } from 'react-bootstrap'

import {
  Link,
} from 'react-router-dom'

const Home = ({ blogFormRef,
  addBlog,
  blogs }) => {

  const linkStyle = {
    color: 'SteelBlue',
    textDecoration: 'none'
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <ListGroup className='listed-blogs'>
        {blogs.map(blog =>
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`} style={linkStyle}>
              <div>
                {blog.title} {blog.author}
              </div>
            </Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default Home