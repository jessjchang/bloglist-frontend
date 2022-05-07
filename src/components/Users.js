import { Table } from 'react-bootstrap'
import {
  Link,
} from 'react-router-dom'

const Users = ({ allUsers }) => {
  const linkStyle = {
    color: 'SteelBlue',
    textDecoration: 'none'
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th><strong>blogs created</strong></th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(user =>
            <tr key={user.id}>
              <td><Link style={linkStyle} to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users