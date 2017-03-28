import React, { PropTypes } from 'react'

import { NavItem } from 'react-bootstrap'
import {IndexLinkContainer} from 'react-router-bootstrap'

/* Purely presentational component */
const NavIndexLink = ({ children, to }) => {
  return (
    <IndexLinkContainer to={to}>
      <NavItem role='navigation'>
        {children}
      </NavItem>
    </IndexLinkContainer>
  )
}

NavIndexLink.propTypes = {
  children: PropTypes.any,
  to: PropTypes.object.isRequired
}

export default NavIndexLink
