import React from 'react'

import '../MyContent.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import ChessGame from 'chess-client'
import DocumentTitle from 'react-document-title'

import {
  Grid,
  PageHeader
} from 'react-bootstrap'

/* Purely presentational component */
const Chess = ({ readMore, toggleReadMore, myFetch, user, jwToken, navigate }) => {
  return (
    <DocumentTitle title='Chess game'>
      <div>
        <MyHeader headline='Chess&#9816;' />

        <div className='mycontent'>

          <ChessGame
            playerUid={user ? user.uid : null}
            playerName={user ? user.name : null}
            myFetch={jwToken !== null ? myFetch(jwToken) : null}
            navigate={navigate}
            />

        </div>
        <div className='mycontent' style={{ marginTop: '10em' }}>

          <Grid>
            <PageHeader>About this app</PageHeader>
            <p>
                  This app is made with React, Redux and Bootstrap. The API is
                  implemented with PHP and MySQL.
            </p>
            <p><small>
              <label>{'Client:'}</label> <a href='https://github.com/Korkemoms/chess-client'>
                {'https://github.com/Korkemoms/chess-client'}</a>
              <br /><label>{'API:'}</label> <a href='https://github.com/Korkemoms/amodahl.no-api'>
                {'https://github.com/Korkemoms/amodahl.no-api'}</a>
            </small></p>
          </Grid>

        </div>
      </div>
    </DocumentTitle>
  )
}

export default Chess
