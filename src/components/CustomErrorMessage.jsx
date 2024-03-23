import React from 'react'

function CustomErrorMessage(props) {
  return (
    <p className='errorMessage'>{props.message}</p>
  )
}

export default CustomErrorMessage