import axios from 'axios'
axios.defaults.baseURL = 'https://j-tech-reminder.herokuapp.com'
// CONFIGURATION
const token = localStorage.getItem('token')
axios.defaults.headers = {
  authorization: `Bearer ${token}`,
}
// USER
export const register = async (userDetails) => {
  const { data } = await axios.post('/user/register', userDetails)
  return data
}
export const login = async (userDetails) => {
  const { data } = await axios.post('/user/login', userDetails)
  return data
}
export const forgotpassword = async (userDetails) => {
  const { data } = await axios.post('/user/forgotpassword', userDetails)
  return data
}
export const resetpassword = async (userDetails) => {
  const { data } = await axios.post('/user/resetpassword', userDetails)
}
// NOTE
export const getNotes = async () => {
  const { data } = await axios.get('reminder/getNotes')
  return data
}
export const createNote = async (note) => {
  const { data } = await axios.post('reminder/createNote', note)
  return data
}
export const deleteNote = async (id) => {
  const item = { id: id }
  const { data } = await axios.delete('/reminder/deleteNote', {
    data: item,
  })
  return data
}
// TYPES
export const getTypes = async () => {
  const { data } = await axios.get('reminder/getTypes')
  return data
}
export const createType = async (type) => {
  const { data } = await axios.post('reminder/createType', type)
  return data
}
export const deleteType = async (id) => {
  const data = await axios.delete('/reminder/deleteType', {
    data: id,
  })
}
