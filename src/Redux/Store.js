import { configureStore } from '@reduxjs/toolkit'
import UIreducer from './Slice'
export default configureStore({
  reducer: {
    UI: UIreducer,
  },
})
