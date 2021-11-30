import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { forgotpassword } from '../../utils/Api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loader from 'react-loader-spinner'
const ForgotPassword = () => {
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
      rotateZ: 360,
    },
    show: {
      x: 0,
      opacity: 1,
      rotateZ: 0,
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
  const [email, setEmail] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = { email: email }
      const info = await forgotpassword(data)
      toast.success(info.msg)
      console.log(info.resetLink)
      setEmail('')
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
          <h2>Forgot Password</h2>
        </motion.header>
        <form onSubmit={handleSubmit}>
          <motion.input
            type="email"
            placeholder="Email"
            required
            variants={childVariant}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          {isLoading && (
            <div className="loader">
              <Loader
                type="Triangle"
                height={30}
                width={30}
                timeout={20000}
                color="#3e89d8"
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
        <motion.p variants={link} className="link-container ">
          <Link className="link" to="/login">
            login
          </Link>
        </motion.p>
      </div>
    </motion.section>
  )
}

export default ForgotPassword
