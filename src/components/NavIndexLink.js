import React, { PropTypes } from 'react'

import { NavItem } from 'react-bootstrap'
import {IndexLinkContainer} from 'react-router-bootstrap'

const NavIndexLink = ({ children, to, setFadeInEnabled }) => {
  return (
    <IndexLinkContainer to={to}>
      <NavItem role='navigation' onClick={() => {
        setFadeInEnabled(false)
      }}>
        {children}
      </NavItem>
    </IndexLinkContainer>
  )
}
NavIndexLink.propTypes = {
  children: PropTypes.any,
  to: PropTypes.object.isRequired,
  setFadeInEnabled: PropTypes.func.isRequired
}
export default NavIndexLink
