// @flow
import React from 'react'

import { NavItem } from 'react-bootstrap'
import {IndexLinkContainer} from 'react-router-bootstrap'

/* Purely presentational component */
const NavIndexLink = (props: Object) => {
  const {children, to}: {children: Array<mixed>, to: string} = props
  return (
    <IndexLinkContainer to={to}>
      <NavItem role='navigation'>
        {children}
      </NavItem>
    </IndexLinkContainer>
  )
}

export default NavIndexLink
