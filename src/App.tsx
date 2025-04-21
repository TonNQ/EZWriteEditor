import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TextEditor from './components/TextEditor'
import TipTapEditor from './components/TiptapEditor'
import RequestInterceptor from './config/RequestInterceptor'
import ResponseInterceptor from './config/ResponseInterceptor'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 0
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <TextEditor /> */}
      <RequestInterceptor />
      <ResponseInterceptor />
      <TipTapEditor />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
