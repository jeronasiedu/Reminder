import React, { useState, useEffect } from 'react'
import './Main.css'
import { IconButton, useMediaQuery } from '@mui/material'
import { BiAddToQueue, BiCheck, BiPowerOff } from 'react-icons/all'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, closeSidebar } from '../../Redux/Slice'
import ListItem from './ListItem'
import { useNavigate } from 'react-router-dom'
import { getToken, removeToken } from '../../utils/helpers'
import { getNotes, createNote, deleteNote } from '../../utils/Api'
import { useQuery, useQueryClient, useMutation, QueryCache } from 'react-query'
import Loader from 'react-loader-spinner'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { Skeleton, Stack } from '@mui/material'
import { toast } from 'react-toastify'
const Main = () => {
  const media = useMediaQuery('(max-width: 480px')
  const queryCache = new QueryCache()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { activeTag, sideBarOpen } = useSelector((state) => state.UI)
  const [text, setText] = useState('')
  const [reload, setReload] = useState(false)

  const [isInputActive, setIsInputActive] = useState(false)
  // Checking if a user is logged in
  useEffect(() => {
    const token = getToken()
    if (!token) {
      navigate('/login', { replace: true })
    }
  }, [])
  const handleToggle = () => {
    dispatch(toggleSidebar())
  }
  useEffect(() => {
    setTimeout(() => {
      setReload(!reload)
    }, 500)
  }, [])

  // REACT QUERY
  const { data, isLoading, isError } = useQuery('notes', getNotes)
  // MUTATION
  const { mutateAsync: addAsync, isLoading: addLoading } = useMutation(
    createNote,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notes')
      },
    }
  )
  const { mutateAsync: deleteAsync, isLoading: delLoading } = useMutation(
    deleteNote,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notes')
      },
    }
  )
  if (isError) {
    toast.error('You seem to be offline',{
      toastId:'do not repeat'
    })
  }
  // getting notes

  // handle logout
  const handleLogOut = async () => {
    removeToken()
    queryCache.clear()
    navigate('/login', { replace: true })
  }
  //  handle Adding
  const handleSubmit = async (e) => {
    const data = {
      text,
      type: activeTag._id,
    }
    e.preventDefault()
    await addAsync(data)
    setIsInputActive(false)
    setText('')
  }
  // HANDLE DELETE
  const deleteItem = async (id) => {
    await deleteAsync(id)
  }
  // handling toggleSidebar
  const handleInputToggle = () => {
    if (media) {
      dispatch(closeSidebar())
    }
    setIsInputActive(true)
  }
  const handleRefresh = async () => {
    setReload(!reload)
  }
  // handle input focus
  const handleFocus = (e) => {
    setIsInputActive(false)
  }
  return (
    <motion.section className="main">
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="top">
          <h2>Reminder</h2>
          <IconButton
            aria-label="logout"
            color="warning"
            onClick={handleLogOut}
            size="small"
          >
            <BiPowerOff />
          </IconButton>
          <IconButton
            aria-label="add reminder"
            size="small"
            onClick={handleInputToggle}
          >
            <BiAddToQueue />
          </IconButton>
        </div>
        <motion.button
          key="toggle"
          className="toggle"
          onClick={handleToggle}
        ></motion.button>
        {/* MIDDLE SECTION */}
        <div className="middle">
          {data && data.notes.length < 1 && (
            <div className="noItem">
              <h3>No reminder</h3>
              <p>Got nothing today?</p>
            </div>
          )}
          {isLoading && (
            <div className="loader">
              <Loader
                type="TailSpin"
                height={45}
                width={45}
                timeout={20000}
                color="#3a89d8"
              />
            </div>
          )}
          {/* {isError && (
            <div className="error">
              <p>
                There were errors fetching your notes, please pull to refresh
              </p>
            </div>
          )} */}
          <motion.ul className="lists">
            {data ? (
              data.notes
                .filter((item) => {
                  if (activeTag.name === 'all') {
                    return item
                  }
                  return item.type.name === activeTag.name
                })
                .map((item, idx) => {
                  return (
                    <ListItem
                      {...item}
                      key={idx}
                      deleteItem={() => deleteItem(item._id)}
                    />
                  )
                })
            ) : (
              <Stack spacing={1}>
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" />
              </Stack>
            )}
          </motion.ul>
        </div>
        {/* SEARCH SECTION */}
        <AnimatePresence>
          {isInputActive && (
            <motion.div
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 5,
              }}
              className="input"
            >
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="New reminder..."
                  spellCheck="false"
                  required
                  value={text}
                  autoFocus
                  onChange={(e) => {
                    setText(e.target.value)
                  }}
                  onBlur={handleFocus}
                />
                {addLoading ? (
                  <div className="loader-main">
                    <Loader
                      type="BallTriangle"
                      height={20}
                      width={20}
                      timeout={20000}
                      color="#1d8bf8"
                    />
                  </div>
                ) : (
                  <IconButton
                    type="submit"
                    aria-label="add reminder"
                    size="small"
                    color="primary"
                  >
                    <BiCheck />
                  </IconButton>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </PullToRefresh>
    </motion.section>
  )
}

export default Main
