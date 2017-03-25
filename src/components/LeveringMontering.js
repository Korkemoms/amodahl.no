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
  Carousel
} from 'react-bootstrap'

/* Purely presentational component */
const LeveringMontering = ({carouselIndex, carouselDirection, carouselSelect}) => {
  const carousel =
    <Carousel className='myimage'
      activeIndex={carouselIndex}
      direction={carouselDirection}
      onSelect={carouselSelect}>
      <Carousel.Item>
        <img width={800} height={930} alt='New order'
          src={ImageNewOrder} />
        <Carousel.Caption>
          <h3>New order</h3>
          <p>Warehouse employees and customers can create a new order on this page.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={800} height={930} alt='Overview of orders' src={ImageOverview} />
        <Carousel.Caption>
          <h3>Overview</h3>
          <p>Employees get an overview of all the orders.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={800} height={930} alt='Users' src={ImageUsers} />
        <Carousel.Caption>
          <h3>Users</h3>
          <p>Admins can access user settings from this page.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={800} height={930} alt='Account settings' src={ImageMyAccount} />
        <Carousel.Caption>
          <h3>Account settings</h3>
          <p>Users can change a few properties from this page.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  return (
    <DocumentTitle title='leveringmontering.no'>
      <div>
        <MyHeader headline='leveringmontering.no' />
        <div className='mycontent'>
          <Grid>
            <Row>
              <Col xs={12} sm={8}>
                <h1>About leveringmontering.no</h1>
                <p>This is a order management system I made for a company that delivers furniture.
                  The system is used on a daily basis and I am
                  Although I am not overwhelmed with pride by the design,

                  This is my first non-trivial web project
                </p>
              </Col>
              <Col xs={12} sm={4}>
                {carousel}
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
    </DocumentTitle>
  )
}

export default LeveringMontering
