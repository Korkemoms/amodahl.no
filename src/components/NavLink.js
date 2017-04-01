// @flow
import React from 'react'

import { NavItem } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

/* Purely presentational component */
const NavLink = (props: Object) => {
  const {children, to}: {children: Array<mixed>, to: string} = props
  return (
    <LinkContainer to={to}>
      <NavItem role='navigation'>
        {children}
      </NavItem>
    </LinkContainer>
  )
}

export default NavLink
