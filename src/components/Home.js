import React from 'react'
import { Link } from 'react-router'

import '../JumbotronMini.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'

import {
  Grid,
  Row,
  Col,
  Jumbotron,
  Button
} from 'react-bootstrap'

const Home = ({ fadeInEnabled, disableFadeIn }) => {
  return (
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
                    My latest project is a chess app. I am developing it with react-bootstrap
                    and some other great javascript and php libraries.
                  </p>
                  <p><Link to='/chess-project' onClick={() => {
                    disableFadeIn()
                  }}><Button bsStyle='primary'>Read more</Button></Link></p>
                </Jumbotron>
              </Col>
              <Col xs={12} md={4}>
                <Jumbotron bsClass='jumbotron-mini' style={{backgroundColor: 'transparent'}}>
                  <h1>Projects</h1>
                  <p>
                    I have worked on many personal programming projects.
                    I plan on showing a few of the ones that made it into
                    production here.
                  </p>
                </Jumbotron>
              </Col>
              <Col xs={12} md={4}>
                <Jumbotron bsClass='jumbotron-mini' style={{backgroundColor: 'transparent'}}>
                  <h1>About me</h1>
                  <p>
                    I'm an aspiring software developer living in Bergen, Norway.
                  I enjoy turning complex problems into simple solutions and I
                  like making user friendly interfaces.
                  </p>
                  <p><Link to='/about' onClick={() => {
                    disableFadeIn()
                  }}><Button bsStyle='primary'>More about me</Button></Link></p>
                </Jumbotron>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default Home
