import React from 'react'
import { Divider, IconButton } from '@mui/material'
import { CgClose } from 'react-icons/all'
import { motion } from 'framer-motion'
import { formatRelative, parseISO } from 'date-fns'
import Loader from 'react-loader-spinner'
const ListItem = ({ text, type, deleteItem, date }) => {
  const childList = {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  }
  return (
    <>
      <motion.li
        variants={childList}
        initial="hidden"
        animate="visible"
        key={text}
        className="list-item"
      >
        <div className="list-item-left">
          <div className="list-text-date">
            <p className="list-text">{text}</p>
            <p className="list-date">
              {formatRelative(parseISO(date), new Date())}
            </p>
          </div>
          {type && type.name.toLowerCase() !== 'all' ? (
            <p className="list-type">{type.name}</p>
          ) : null}
        </div>
        <div className="list-item-right">
          <IconButton
            size="small"
            aria-label="delete"
            color="warning"
            onClick={deleteItem}
          >
            <CgClose />
          </IconButton>
        </div>
      </motion.li>
      <Divider />
    </>
  )
}

export default ListItem
