import React from 'react'
import { Link } from 'react-router'

import '../JumbotronMini.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import DocumentTitle from 'react-document-title'

import {
  Grid,
  Row,
  Col,
  Jumbotron,
  Button,
  DropdownButton,
  MenuItem
} from 'react-bootstrap'

const Home = ({ fadeInEnabled, disableFadeIn, navigate }) => {
  return (
    <DocumentTitle title='amodahl.no'>
      <div>
        <MyHeader headline='Welcome' />

        <div className={fadeInEnabled ? 'Fade-in' : ''}>
          <Grid>
            <Row className='Center' style={{color: '#e9e9e9'}}>
              <Col xs={12}>
                <Jumbotron style={{backgroundColor: 'transparent'}}>
                  <h1>Hi</h1>
                  <p>
                  I'm Andreas and I like to code. My latest passion is making
                  things for the browser and this website is my playground.
                </p>
                </Jumbotron>
              </Col>
            </Row>
          </Grid>
          <div style={{backgroundColor: 'white'}}>
            <Grid>
              <Row className='Center' >
                <Col xs={12} md={4}>
                  <Jumbotron bsClass='jumbotron-mini' style={{backgroundColor: 'transparent'}}>
                    <h1>Chess&#9822;</h1>
                    <p>
                    I am working on a chess app for the browser. It is made with React, Redux, Bootstrap and PHP.
                  </p>
                    <Link to='/chess-project' onClick={() => {
                      disableFadeIn()
                    }}><Button bsStyle='success'>Play</Button></Link>
                  </Jumbotron>
                </Col>
                <Col xs={12} md={4}>
                  <Jumbotron bsClass='jumbotron-mini' style={{backgroundColor: 'transparent'}}>
                    <h1>Projects</h1>
                    <p>
                    Here are some of the things I have made that are not totally useless. 😄
                  </p>
                    <DropdownButton id='projects-dropdown-menu-button' bsStyle='success' title='Projects'>
                      <MenuItem onClick={() => navigate('/chess-project')}>
                    Chess
                    </MenuItem>
                      <MenuItem onClick={() => navigate('/amodahl-no')}>
                    amodahl.no
                    </MenuItem>
                      <MenuItem onClick={() => navigate('/matrix-multiplication')}>
                      Matrix multiplication game
                    </MenuItem>
                      {/*<MenuItem onClick={() => navigate('/leveringmontering')}>
                      Leveringmontering.no (Order management system)
                    </MenuItem>*/}

                    </DropdownButton>
                  </Jumbotron>
                </Col>
                <Col xs={12} md={4}>
                  <Jumbotron bsClass='jumbotron-mini' style={{backgroundColor: 'transparent'}}>
                    <h1>About me</h1>
                    <p>
                    I'm a programmer living in Bergen, Norway.
                  I enjoy turning complex problems into simple solutions and I
                  love to build stuff.
                  </p>
                    <Link to='/about' onClick={() => {
                      disableFadeIn()
                    }}><Button bsStyle='success'>Read more</Button></Link>
                  </Jumbotron>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Home
