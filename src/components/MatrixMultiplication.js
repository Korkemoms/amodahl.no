import React from 'react'

import '../MyContent.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import GameImage from '../images/Matrix-multiplication-image.png'

import {
  Grid,
  Row,
  Col,
  Image
} from 'react-bootstrap'

const MatrixMultiplication = () => {
  return (
    <div>
      <MyHeader headline='Matrix multiplication game' />

      <div style={{background: 'white'}}>

        <div style={{background: 'white'}}>
          <Grid>
            <Row>
              <Col className='mycontent' xs={12} sm={8}>
                <h1>About this game</h1>
                <p>This is a small game for Android where players practice multiplying matrices.</p>
                <p>
              My own experience:<br />
              I use the app to compute just a few matrices a week, when I am in an
              elevator or waiting for the bus. It has improved the speed of my mental
              arithmetic a lot, I also think and reason about matrices and vectors
              much quicker than before.
            </p>
              </Col>
              <Col xs={12} sm={4}>
                <Image className='myimage' src={GameImage} responsive />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <p>
                  <label>Play store:</label>{' '}
                  <a href='https://play.google.com/store/apps/details?id=org.ajm.laforkids'>
                    {'https://play.google.com/store/apps/details?id=org.ajm.laforkids'}</a>
                  <br />
                  <label>Source code:</label>{' '}
                  <a href='https://github.com/Korkemoms/Matrix-Multiplication'>
                    {'https://github.com/Korkemoms/Matrix-Multiplication'}</a>
                </p>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>

  )
}

export default MatrixMultiplication
