import React, { PropTypes } from 'react'

import '../JumbotronMini.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import ChessGame from 'chess-client'

import {
  Grid,
  PageHeader,
  ButtonToolbar,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  Button
} from 'react-bootstrap'

const Chess = ({ readMore, toggleReadMore, myFetch, myEmail, myName, jwToken }) => {
  const readMoreButton = readMore ? ''
      : <Button bsStyle='primary' onClick={() => {
        toggleReadMore(true)
      }}>Read more</Button>

  return (
    <div>
      <MyHeader headline='Chess&#9816;' />

      <div style={{background: 'white'}}>

        <Jumbotron className='jumbotron-mini' style={{background: 'white'}}>

          <ChessGame myEmail={myEmail} myName={myName}
            myFetch={jwToken !== null ? myFetch(jwToken) : null} />

        </Jumbotron>
      </div>
      <div style={{background: 'white', marginTop:'10em'}}>

        <Jumbotron className='jumbotron-mini' style={{background: 'white'}}>
          <Grid>

            <PageHeader>Blabla</PageHeader>
            <p>
                  I am making this game to learn more about exciting
                  web technologies. <b>I disabled network play, I will enable
                  it again when the api is not totally unsafe 😀</b>
            </p>
            <ButtonToolbar>
              {readMoreButton}
            </ButtonToolbar>
            <div style={{display: readMore ? 'block' : 'none'}}>
              <PageHeader>Front-end <small>some of the technologies I use to make the client</small></PageHeader>
              <p>
                I used create-react-app as boilerplate, it comes with loads of
                useful features that helped me get started.
              </p>
              <p>
                I am now remaking the app with Redux because it looks really convenient with React.
              </p>
              <ListGroup>
                <ListGroupItem header='React'>It makes it easy to build reusable javascript UI components</ListGroupItem>
                <ListGroupItem header='Redux'>Manage the state.</ListGroupItem>
                <ListGroupItem header='Bundler (Webpack)'>Turn a complicated project into static js and css for deployment</ListGroupItem>
                <ListGroupItem header='NPM'>Makes it extremely easy to find and add new libraries to a project</ListGroupItem>
                <ListGroupItem header='react-router'>Keeps the URL in sync with the UI</ListGroupItem>
                <ListGroupItem header='ES6 (babel)'>I like modules and arrow functions</ListGroupItem>
                <ListGroupItem header='Bootstrap (react-bootstrap)'>Because i want things to look good</ListGroupItem>
                <ListGroupItem header='CSS preprocessor (Sass)'>More flexible css</ListGroupItem>
              </ListGroup>

              <PageHeader>Back-end <small>some of the technologies I use to make the API</small></PageHeader>
              <p>
                The API was terribly unsafe, I am now rebuilding it with JSON Web Tokens.
                I found a nice boilerplate (<a href='https://github.com/tuupola/slim-api-skeleton'>slim-api-skeleton</a>) which comes
                 with many useful libraries.
              </p>
              <ListGroup>
                <ListGroupItem header='Composer'>Makes it extremely easy to find and add new libraries to a project</ListGroupItem>
                <ListGroupItem header='Slim'>Framework for adding routers, middleware and more</ListGroupItem>
                <ListGroupItem header='Spot'>Datamapper, makes it easier to work with the database.</ListGroupItem>
                <ListGroupItem header='Fractal'>Consistent data output from the API.</ListGroupItem>

              </ListGroup>
            </div>
          </Grid>

        </Jumbotron>
      </div>
    </div>

  )
}

Chess.propTypes = {
  readMore: PropTypes.bool.isRequired,
  toggleReadMore: PropTypes.func.isRequired,
  myFetch: PropTypes.func,
  dispatch: PropTypes.func,
  myEmail: PropTypes.string,
  myName: PropTypes.string
}
export default Chess
