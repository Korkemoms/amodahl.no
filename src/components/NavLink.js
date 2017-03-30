// @flow
import React from 'react'

import { NavItem } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

/* Purely presentational component */
const NavLink = (props: {
  children: Array<mixed>,
  to: string
 }) => {
  return (
    <LinkContainer to={props.to}>
      <NavItem role='navigation'>
        {props.children}
      </NavItem>
    </LinkContainer>
  )
}

export default NavLink
