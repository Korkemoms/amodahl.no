import React, { PropTypes } from 'react'

import { NavItem } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const NavLink = ({ children, to, disableFadeIn }) => {
  return (
    <LinkContainer to={to}>
      <NavItem role='navigation' onClick={() => {
        disableFadeIn()
      }}>
        {children}
      </NavItem>
    </LinkContainer>
  )
}

NavLink.propTypes = {
  children: PropTypes.any,
  to: PropTypes.object.isRequired,
  disableFadeIn: PropTypes.func.isRequired
}

export default NavLink
