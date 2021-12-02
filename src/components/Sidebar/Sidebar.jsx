import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton, Stack } from '@mui/material'
import { updateActiveTag } from '../../Redux/Slice'
import { BiPlus, BiCheck, IoClose } from 'react-icons/all'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { getTypes, createType, deleteType } from '../../utils/Api'
import { Skeleton } from '@mui/material'
import Loader from 'react-loader-spinner'
const Sidebar = () => {
  const [text, setText] = useState('')
  const [addOpen, setAddOPen] = useState(false)
  const dispatch = useDispatch()
  const { activeTag } = useSelector((state) => state.UI)
  // REACT QUERY
  const { data, isLoading } = useQuery('types', getTypes)
  const queryClient = useQueryClient()
  const { mutateAsync: addAsync, isLoading: addLoading } = useMutation(
    createType,
    {
      onSuccess: () => {
        queryClient.invalidateQueries()
      },
    }
  )
  // deleting tag
  const { mutateAsync: deleteAsync } = useMutation(deleteType, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
  // adding tag
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (text.toLowerCase() === 'all') {
      return toast.error(`Sorry, please choose a different tag name`)
    }
    const info = { name: text }
    await addAsync(info)
    setText('')
    setAddOPen(false)
  }
  // SETTING ACTIVE TAG ON LOAD
  useEffect(() => {
    if (data && Object.keys(activeTag).length === 0) {
      let allTag = data.types.filter((item) => {
        return item.name === 'all'
      })
      allTag = allTag[0]
      dispatch(updateActiveTag(allTag))
    }
  }, [data])
  // handle active tag
  const handleActiveTag = (e, item) => {
    dispatch(updateActiveTag(item))
    const listItems = document.querySelectorAll('.tag-list')
    listItems.forEach((item) => {
      item.classList.remove('active')
    })
    e.target.classList.add('active')
  }
  // handle Delete
  const handleDelete = async (e, item) => {
    e.preventDefault()
    if (item.name === 'all') return
    const info = { id: item._id }
    await deleteAsync(info)
  }
  const sectionVariant = {
    hidden: {
      opacity: 0,
      flex: 0,
    },
    show: {
      opacity: 1,
      flex: 1.6,
    },
    exit: {
      opacity: 0,
      flex: 0,
    },
  }
  const handleFocus = () => {
    setAddOPen(false)
  }
  return (
    <AnimatePresence>
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        className="sidebar"
      >
        <motion.div key="list-scroll" className="list-scroll">
          <ul className="tag-lists">
            {isLoading && (
              <div className="loader-sidebar">
                <Loader
                  type="Puff"
                  height={20}
                  width={20}
                  timeout={10000}
                  color="#1d8bf8"
                />
              </div>
            )}
            {data ? (
              data.types.map((item, idx) => {
                return (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    key={idx}
                    className="list-container"
                  >
                    <motion.li
                      className="tag-list"
                      onClick={(e) => {
                        handleActiveTag(e, item)
                      }}
                    >
                      {item.name}
                    </motion.li>
                    {item.name !== 'all' && (
                      <IconButton
                        size="small"
                        aria-label="delete"
                        color="warning"
                        onClick={(e) => {
                          handleDelete(e, item)
                        }}
                        className="delete-list"
                      >
                        <IoClose />
                      </IconButton>
                    )}
                  </motion.div>
                )
              })
            ) : (
              <Stack>
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" />
              </Stack>
            )}
          </ul>
        </motion.div>
        <div className="tag">
          {addOpen && (
            <motion.form
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="tag-input-form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                spellCheck="false"
                placeholder="add tag"
                autoFocus
                required
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                }}
                onBlur={handleFocus}
              />
              {addLoading ? (
                <div
                  className="loader-main"
                  style={{
                    transform: 'translateY(0.2rem)',
                  }}
                >
                  <Loader
                    type="Puff"
                    height={20}
                    width={20}
                    timeout={20000}
                    color="#1d8bf8"
                  />
                </div>
              ) : (
                <IconButton
                  type="submit"
                  aria-label="add tag"
                  size="small"
                  color="primary"
                >
                  <BiCheck />
                </IconButton>
              )}
            </motion.form>
          )}

          <div className="add-tag">
            <IconButton
              aria-label="add tag"
              size="small"
              color="warning"
              onClick={() => setAddOPen(true)}
            >
              <BiPlus />
            </IconButton>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

export default Sidebar
