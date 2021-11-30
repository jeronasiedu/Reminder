import { createSlice } from '@reduxjs/toolkit'
const UIslice = createSlice({
  name: 'UI',
  initialState: {
    sideBarOpen: false,
    tags: ['all'],
    activeTag: {},
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sideBarOpen = !state.sideBarOpen
    },
    closeSidebar: (state) => {
      state.sideBarOpen = false
    },
    updateActiveTag: (state, action) => {
      state.activeTag = action.payload
    },
  },
})
const { actions, reducer } = UIslice
export const { toggleSidebar, updateActiveTag, closeSidebar } = actions
export default reducer
