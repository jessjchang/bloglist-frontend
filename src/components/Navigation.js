import styled from 'styled-components'

import {
  Link
} from 'react-router-dom'

const StyledNavigation = styled.div`
  background: SteelBlue;
  color: white;
  padding: 1em;
`

const Navigation = ({ user, handleLogout }) => {
  const linkStyle = {
    color: 'PaleTurquoise',
    padding: 5,
    textDecoration: 'none'
  }

  return (
    <StyledNavigation>
      <Link style={linkStyle} to="/">blogs</Link>
      <Link style={linkStyle} to="/users">users</Link>
      {user.name} logged in
      <button id='logout-button' onClick={handleLogout}>logout</button>
    </StyledNavigation>
  )
}

export default Navigation