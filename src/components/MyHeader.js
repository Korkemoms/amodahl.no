// @flow
import React from 'react'

/* Purely presentational component */
const MyHeader = (props: {
  headline: string
}) =>
  <div className='bs-docs-header Header'>
    <div className='container'>
      <div id='Title-container'>
        <h1>{props.headline}</h1>
      </div>
    </div>
  </div>

export default MyHeader
