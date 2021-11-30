import React from 'react'
import svg from '../../images/9.svg'
import { useNavigate } from 'react-router-dom'
import './NotFound.css'
import { Button } from '@mui/material'
const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="notfound">
      <h2>You are missing</h2>
      <div className="notfound-img">
        <img src={svg} alt="notFound" />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate('/', { replace: true })
        }}
      >
        Home
      </Button>
    </div>
  )
}

export default NotFound
