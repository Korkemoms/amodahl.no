import React, { PropTypes } from 'react'

import { NavItem } from 'react-bootstrap'
import {IndexLinkContainer} from 'react-router-bootstrap'

const NavIndexLink = ({ children, to, disableFadeIn }) => {
  return (
    <IndexLinkContainer to={to}>
      <NavItem role='navigation' onClick={() => {
        disableFadeIn()
      }}>
        {children}
      </NavItem>
    </IndexLinkContainer>
  )
}

NavIndexLink.propTypes = {
  children: PropTypes.any,
  to: PropTypes.object.isRequired,
  disableFadeIn: PropTypes.func.isRequired
}

export default NavIndexLink
