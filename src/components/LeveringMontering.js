// @flow
import React from 'react'

import '../MyContent.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import DocumentTitle from 'react-document-title'

import ImageNewOrder from '../images/Levering-montering-ny-ordre.png'
import ImageOverview from '../images/Levering-montering-oversikt.png'
import ImageUsers from '../images/Levering-montering-brukere.png'
import ImageMyAccount from '../images/Levering-montering-min-konto.png'

import {
  Grid,
  Row,
  Col,
  Thumbnail,
  PageHeader,
  Nav,
  NavItem
} from 'react-bootstrap'

/* Purely presentational component */
class LeveringMontering extends React.Component {

  handleScroll: Function
  sidebar: Object

  componentDidMount () {
    this.handleScroll = () => {
      // $FlowFixMe
      if (document.body.scrollTop > 304) {
        this.sidebar.className = 'sidenav-fixed'
      } else {
        this.sidebar.className = 'sidenav'
      }
    }
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    const navInstance =

      <div style={{position: 'absolute', right: '0', width: '200px'}}>
        <div className='sidenav' ref={sidebar => { this.sidebar = sidebar }}>
          <Nav stacked activeKey={1} onSelect={(e) => {
            this.props.push(`/leveringmontering#${e}`)
          }}>

            <NavItem style={{fontWeight: 'bold'}} eventKey={''}>Leveringmontering.no</NavItem>
            <NavItem eventKey={'lm-new-order'}>New order</NavItem>
            <NavItem eventKey={'lm-overview'}>Overview</NavItem>
            <NavItem eventKey={'lm-users'}>Users</NavItem>
            <NavItem eventKey={'lm-settings'}>Settings</NavItem>
          </Nav>
        </div>
      </div>

    const img1 =
      <div style={{maxWidth: '600px'}} >
        <PageHeader style={{cursor: 'pointer'}} id='lm-new-order' onClick={(e) => {
          this.props.push(`/leveringmontering#lm-new-order`)
        }}>New order</PageHeader>
        <Thumbnail alt='New order' src={ImageNewOrder} />
        <p>Warehouse employees and customers can create new orders.</p>
      </div>

    const img2 =
      <div style={{maxWidth: '600px'}} >
        <PageHeader style={{cursor: 'pointer'}} id='lm-overview' onClick={(e) => {
          this.props.push(`/leveringmontering#lm-overview`)
        }}>Overview</PageHeader>
        <Thumbnail alt='Overview of orders' src={ImageOverview} />
        <p>Employees get an overview of all the orders.</p>
      </div>

    const img3 =
      <div style={{maxWidth: '600px'}} >
        <PageHeader style={{cursor: 'pointer'}} id='lm-users' onClick={(e) => {
          this.props.push(`/leveringmontering#lm-users`)
        }}>Users</PageHeader>
        <Thumbnail alt='Users' src={ImageUsers} />
        <p>Admins can access user settings here.</p>
      </div>

    const img4 =
      <div style={{maxWidth: '600px'}} >
        <PageHeader style={{cursor: 'pointer'}} id='lm-settings' onClick={(e) => {
          this.props.push(`/leveringmontering#lm-settings`)
        }}>Settings</PageHeader>
        <Thumbnail alt='Account settings' src={ImageMyAccount} />
        <p>Users can change some properties from this page.</p>
      </div>

    return (
      <DocumentTitle title='Leveringmontering.no'>
        <div>
          <MyHeader headline='Leveringmontering.no' />
          <div style={{minHeight: '325px'}} className='mycontent'>
            <Grid>
              <PageHeader>About Leveringmontering.no</PageHeader>
              <Row>
                <Col xs={12} sm={8}>
                  <p>
                    This is a simple order management system I made in autumn 2016
                    for a company
                    that delivers furniture. It was one of my first experiences with
                    web development and there are many things I would do different if I was to
                    make something similar again. It is still in use and there has
                    been very few problems with it since I quit working on it.
                  </p>
                  <p>
                    The system is written primarily in PHP and MySql.
                  </p>
                </Col>
                <Col xs={12} sm={4}>
                  {navInstance}
                </Col>
              </Row>
            </Grid>
          </div>
          <div style={{ marginTop: '3em' }} className='mycontent'>
            <Grid>
              <Row>
                <Col xs={12} sm={8}>
                  {img1}
                  {img2}
                  {img3}
                  {img4}
                </Col>
                <Col xs={12} sm={4} />
              </Row>
            </Grid>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default LeveringMontering
