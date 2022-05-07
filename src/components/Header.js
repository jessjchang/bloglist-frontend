import React from 'react'

const Header = ({ title }) => {
  const headerStyle = {
    background: 'LightBlue',
    marginBottom: 10,
    marginTop: 10,
    padding: 10
  }

  return <h2 style={headerStyle}>{title}</h2>
}

export default Header