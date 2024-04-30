import React from 'react'
import {Link} from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'
import './BackButton.css'

const BackButton = ({destination = '/journals/'}) => {
  return (
    <div>
        <Link to={destination} data-testid="back-button">
            <BsArrowLeft />
        </Link>
    </div>
  )
}

export default BackButton