import React, { PropTypes } from 'react'

const MyHeader = ({ headline }) => {
  return (
    <div className='bs-docs-header Header'>
      <div className='container'>
        <div
          id='Title-container'>
          <h1>{headline}</h1>
        </div>
      </div>
      <div className='Background-container' />
    </div>
  )
}

MyHeader.propTypes = {
  headline: PropTypes.string.isRequired
}

export default MyHeader
