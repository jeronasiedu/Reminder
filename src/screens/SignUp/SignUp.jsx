import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.css'
import { Button } from '@mui/material'
import { register } from '../../utils/Api'
import { toast } from 'react-toastify'
import { setToken } from '../../utils/helpers'
import { useQueryClient } from 'react-query'
import Loader from 'react-loader-spinner'
const SignUp = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const formVariant = {
    hidden: {
      opacity: 0,
      y: -80,
      scale: 0,
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
    exit: {
      opacity: 0,
      y: -30,
    },
  }
  const childVariant = {
    hidden: {
      x: -50,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
    },
  }
  const heading = {
    hidden: {
      opacity: 0,
      rotate: 45,
    },
    show: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        type: 'spring',
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
    username: '',
    email: '',
    password: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const info = await register(userDetails)
      setToken(info.token)
      setUserDetails({ username: '', email: '', password: '' })
      queryClient.clear()
      navigate('/', { replace: true })
    } catch (error) {
      setIsLoading(false)
      error.response &&
        toast.error(error.response.data.msg, {
          position: 'top-center',
        })
    }
  }

  return (
    <AnimatePresence>
      <motion.section
        variants={formVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        className="signup"
      >
        <div className="form-container">
          <motion.header variants={heading} className="heading">
            <h2>Create Account</h2>
          </motion.header>
          <form onSubmit={handleSubmit}>
            <motion.input
              type="text"
              placeholder="Username"
              required
              spellCheck="false"
              variants={childVariant}
              value={userDetails.username}
              onChange={(e) => {
                setUserDetails({ ...userDetails, username: e.target.value })
              }}
            />
            <motion.input
              type="email"
              required
              placeholder="Email"
              variants={childVariant}
              value={userDetails.email}
              onChange={(e) => {
                setUserDetails({ ...userDetails, email: e.target.value })
              }}
            />
            <motion.input
              type="password"
              placeholder="Password"
              required
              variants={childVariant}
              value={userDetails.password}
              onChange={(e) => {
                setUserDetails({ ...userDetails, password: e.target.value })
              }}
            />
            {isLoading && (
              <div className="loader">
                <Loader
                  type="TailSpin"
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
              type="submit"
              variant="outlined"
              color="primary"
              size="small"
            >
              Sign in
            </Button>
          </form>
          <motion.p variants={link} className="link-container">
            already have an account?{' '}
            <Link className="link" to="/login">
              log in
            </Link>
          </motion.p>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

export default SignUp
