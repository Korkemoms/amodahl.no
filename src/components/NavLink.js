import React, { PropTypes } from 'react'

import { NavItem } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const NavLink = ({ children, to, setFadeInEnabled }) => {
  return (
    <LinkContainer to={to}>
      <NavItem role='navigation' onClick={() => {
        setFadeInEnabled(false)
      }}>
        {children}
      </NavItem>
    </LinkContainer>
  )
}
NavLink.propTypes = {
  children: PropTypes.any,
  to: PropTypes.object.isRequired,
  setFadeInEnabled: PropTypes.func.isRequired
}
export default NavLink
