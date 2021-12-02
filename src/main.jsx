import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AnimatePresence } from 'framer-motion'
import Store from './Redux/Store'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
const queryClient = new QueryClient()
ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <App />
      </Provider>
      <ToastContainer autoClose={3000} limit={2} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
