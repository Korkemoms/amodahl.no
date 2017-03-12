import React from 'react'

import '../JumbotronMini.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import ChessGame from 'chess-client'

import {
  Grid,
  PageHeader,
  Jumbotron
} from 'react-bootstrap'

const Chess = ({ readMore, toggleReadMore, myFetch, myEmail, myName, jwToken, navigate }) => {
  return (
    <div>
      <MyHeader headline='Chess&#9816;' />

      <div style={{background: 'white'}}>

        <Jumbotron className='jumbotron-mini' style={{background: 'white'}}>

          <ChessGame
            myEmail={myEmail}
            myName={myName}
            myFetch={jwToken !== null ? myFetch(jwToken) : null}
            navigate={navigate}
            />

        </Jumbotron>
      </div>
      <div style={{background: 'white', marginTop: '10em'}}>

        <Jumbotron className='jumbotron-mini' style={{background: 'white'}}>
          <Grid>

            <PageHeader>About this app</PageHeader>
            <p>
                  This app is made with React, Redux and Bootstrap. The API is
                  implemented with PHP and MySQL.
            </p>
            <p>
              <label>{'Client:'}</label> <a href='https://github.com/Korkemoms/chess-client'>
                {'https://github.com/Korkemoms/chess-client'}</a>
              <br /><label>{'API:'}</label> <a href='https://github.com/Korkemoms/amodahl.no-api'>
                {'https://github.com/Korkemoms/amodahl.no-api'}</a>
            </p>

          </Grid>

        </Jumbotron>
      </div>
    </div>

  )
}

export default Chess
