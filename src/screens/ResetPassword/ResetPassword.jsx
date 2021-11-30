import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'
import { resetpassword } from '../../utils/Api'
import { useNavigate } from 'react-router-dom'
import Loader from 'react-loader-spinner'

const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const formVariant = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 1.5,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        staggerChildren: 0.2,
      },
    },
  }
  const childVariant = {
    hidden: {
      x: 100,
      opacity: 0,
      Y: -20,
    },
    show: {
      x: 0,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: 'spring',
      },
    },
  }
  const heading = {
    hidden: {
      opacity: 0,
      rotateX: 360,
      x: 50,
    },
    show: {
      opacity: 1,
      rotateX: 0,
      x: 0,
      transition: {
        duration: 1,
        type: 'spring',
        delay: 0.5,
      },
    },
  }

  const [password, setPassword] = useState({
    password1: '',
    password2: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (password.password1 !== password.password2) {
      setIsLoading(false)
      return toast.error("Passwords don't match")
    }
    const token = searchParams.get('token')
    const id = searchParams.get('id')
    const data = { token, id, password: password.password1 }
    try {
      await resetpassword(data)
      toast.success('Password reset successfully 👌')
      navigate('/login', { replace: true })
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.msg)
    }
  }

  return (
    <motion.section
      variants={formVariant}
      animate="show"
      initial="hidden"
      className="signup"
    >
      <div className="form-container">
        <motion.header className="heading" variants={heading}>
          <h2>Reset Password</h2>
        </motion.header>
        <form onSubmit={handleSubmit}>
          <motion.input
            type="Password"
            placeholder="Password"
            required
            variants={childVariant}
            value={password.password1}
            onChange={(e) => {
              setPassword({ ...password, password1: e.target.value })
            }}
          />
          <motion.input
            type="Password"
            placeholder="Confirm Password"
            required
            variants={childVariant}
            value={password.password2}
            onChange={(e) => {
              setPassword({ ...password, password2: e.target.value })
            }}
          />
          {isLoading && (
            <div className="loader">
              <Loader
                type="TailSpin"
                height={40}
                width={40}
                timeout={10000}
                color="#3a89d8"
              />
            </div>
          )}
          <Button
            sx={{
              width: '100%',
            }}
            variant="outlined"
            color="primary"
            size="small"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </motion.section>
  )
}

export default ResetPassword
