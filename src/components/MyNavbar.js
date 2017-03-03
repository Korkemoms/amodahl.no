import React, { PropTypes } from 'react'
import NavLink from '../containers/NavLink'
import NavIndexLink from '../containers/NavIndexLink'
import {
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap'

const MyNavbar = ({ name, page }) => {
  const userSpecific = name === null
  ? <NavLink eventKey={4} to={{ pathname: '/login' }}>Log in</NavLink>
  : <NavLink eventKey={4} to={{ pathname: '/me' }}>{name}</NavLink>

  return (
    <Navbar
      style={{margin: '0', borderRadius: '0', border: '0'}}
      inverse collapseOnSelect>

      <Navbar.Header>
        <Navbar.Brand>
          <a href='/'>amodahl.no</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavIndexLink eventKey={1} to={{ pathname: '/' }}>Home</NavIndexLink>
          <NavDropdown id='MyProjectsDrowndown' eventKey={2} title='My projects'>
            <NavLink eventKey={2.1} to={{ pathname: '/amodahl-no' }}>amodahl.no</NavLink>
            <NavLink eventKey={2.2} to={{ pathname: '/chess-project' }}>Chess</NavLink>

          </NavDropdown>
          <NavLink eventKey={3} to={{ pathname: '/about' }}>About me</NavLink>

        </Nav>
        <Nav pullRight>
          {userSpecific}
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  )
}

MyNavbar.propTypes = {
  name: PropTypes.string,
  page: PropTypes.string
}

export default MyNavbar
