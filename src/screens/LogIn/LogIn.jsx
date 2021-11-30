import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../utils/Api'
import { setToken } from '../../utils/helpers'
import { useQueryClient } from 'react-query'
import Loader from 'react-loader-spinner'
const LogIn = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
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
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
      },
    },
  }
  const heading = {
    hidden: {
      opacity: 0,
      rotate: 45,
      x: 50,
    },
    show: {
      opacity: 1,
      rotate: 0,
      x: 0,
      transition: {
        duration: 1,
        type: 'spring',
        delay: 0.5,
      },
    },
  }
  const link = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  }
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const info = await login(userDetails)
      setToken(info.token)
      setUserDetails({ email: '', password: '' })
      queryClient.clear()

      navigate('/', { replace: true })
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.msg, {
        position: 'top-center',
      })
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
          <h2>Log In</h2>
        </motion.header>
        <form onSubmit={handleSubmit}>
          <motion.input
            type="email"
            placeholder="Email"
            required
            variants={childVariant}
            value={userDetails.email}
            onChange={(e) => {
              setUserDetails({ ...userDetails, email: e.target.value })
            }}
          />
          <motion.input
            type="password"
            required
            placeholder="Password"
            variants={childVariant}
            value={userDetails.password}
            onChange={(e) => {
              setUserDetails({ ...userDetails, password: e.target.value })
            }}
          />
          {isLoading && (
            <div className="loader">
              <Loader
                type="BallTriangle"
                height={40}
                width={40}
                timeout={20000}
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
            Log in
          </Button>
        </form>
        <motion.p variants={link} className="link-container login">
          <Link className="link" to="/signup">
            sign up
          </Link>
          <Link
            to="/forgotpassword"
            className="link"
            style={{
              marginLeft: 'auto',
            }}
          >
            Forgot Password
          </Link>
        </motion.p>
      </div>
    </motion.section>
  )
}

export default LogIn
