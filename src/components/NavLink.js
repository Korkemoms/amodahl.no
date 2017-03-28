import React, { PropTypes } from 'react'

import { NavItem } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

/* Purely presentational component */
const NavLink = ({ children, to }) => {
  return (
    <LinkContainer to={to}>
      <NavItem role='navigation'>
        {children}
      </NavItem>
    </LinkContainer>
  )
}

NavLink.propTypes = {
  children: PropTypes.any,
  to: PropTypes.object.isRequired
}

export default NavLink
