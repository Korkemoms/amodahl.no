// @flow
import React from 'react'

import { NavItem } from 'react-bootstrap'
import {IndexLinkContainer} from 'react-router-bootstrap'

/* Purely presentational component */
const NavIndexLink = (props: {
  children: Array<mixed>,
  to: string
}) => {
  return (
    <IndexLinkContainer to={props.to}>
      <NavItem role='navigation'>
        {props.children}
      </NavItem>
    </IndexLinkContainer>
  )
}

export default NavIndexLink
