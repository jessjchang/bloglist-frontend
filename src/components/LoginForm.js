import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  username,
  password
}) => (
  <div>
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          id="username-input"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsername}
        />
        <Form.Label>password</Form.Label>
        <Form.Control
          id="password-input"
          type="password"
          value={password}
          name="Password"
          onChange={handlePassword}
        />
        <Button variant="primary" id="login-button" type="submit">login</Button>
      </Form.Group>
    </Form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
