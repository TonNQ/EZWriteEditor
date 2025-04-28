import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import useRouteElements from './routes/useRouteElements'
import { checkAuthOnLoad } from './store/auth/auth.slice'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 0
    }
  }
})

function App() {
  const dispatch = useDispatch()
  const routeElements = useRouteElements()
  const { pathname } = useLocation()

  // Check authentication on app load
  useEffect(() => {
    dispatch(checkAuthOnLoad())
  }, [dispatch])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <QueryClientProvider client={queryClient}>
      {/* <TextEditor /> */}
      {/* <RequestInterceptor />
      <ResponseInterceptor /> */}
      {/* <TipTapEditor /> */}
      {routeElements}
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
