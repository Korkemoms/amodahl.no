import React, { Component } from 'react'
import '../MyContent.scss'
import '../App.scss'
import me from '../images/me.jpg'
import MyHeader from '../components/MyHeader'
import DocumentTitle from 'react-document-title'

import {
  Grid,
  Row,
  Col,
  PageHeader,
  Image
} from 'react-bootstrap'

class About extends Component {

  render () {
    return (
      <DocumentTitle title='About me'>
        <div>
          <MyHeader headline='About me' />

          <div className='mycontent'>

            <Grid>
              <h1>Who am I?</h1>
              <p>
                {
                    'I\'m a computer enthusiast living in Bergen, Norway. I have' +
                    ' a bachelor in computer science and I am interested in' +
                    ' everything about programming and technology. I have some experience' +
                    ' developing apps for desktop, mobile and web browsers.' +
                    ' My latest passion is web development and I am currently diving' +
                    ' into the vast ocean of JavaScript frameworks.' +
                    ' '
                  }
              </p>
              <PageHeader>Contact info</PageHeader>
              <Row>
                <Col xs={1}>
                  <i className='fa fa-address-book-o fa-2x' aria-hidden='true' />
                </Col>
                <Col xs={10}>
                  <p>Andreas Modahl<br />
                        Jordalsveien 291<br />
                        Eidsvåg I Åsane</p>
                </Col>
              </Row>
              <Row>
                <Col xs={1}>
                  <i className='fa fa-phone fa-2x' aria-hidden='true' />
                </Col>
                <Col xs={10}>
                  <p>+47 47 27 05 41</p>
                </Col>
              </Row>
              <Row>
                <Col xs={1}>
                  <i className='fa fa-envelope-o fa-2x' aria-hidden='true' />
                </Col>
                <Col xs={10}>
                  <p>a_modahl@hotmail.com</p>
                </Col>
              </Row>
            </Grid>

          </div>
          <div style={{textAlign: 'center', background: 'white', padding: '5em 0', marginTop: '30em'}}>
            <Image responsive style={{display: 'block', margin: 'auto'}} src={me} />
            <p>Me, somewhere in the mountains</p>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default About
