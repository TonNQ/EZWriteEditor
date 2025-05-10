import { HttpStatusCode } from 'axios'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { ERROR_MESSAGE } from '../constants/message'
import useLocalStorage from '../hooks/useLocalStorage'
import { client } from './queryClient'
// import { path } from 'src/routes/path'

const ResponseInterceptor = () => {
  const [_, setAccessToken] = useLocalStorage<string>('access_token', '')
  //   const location = useLocation()
  //   const navigate = useNavigate()
  const interceptorId = useRef<any>(undefined)

  useEffect(() => {
    interceptorId.current = client.interceptors.response.use(undefined, (error: any) => {
      if (error.response.status === HttpStatusCode.Unauthorized) {
        // navigate(path.login)
        setAccessToken('')
      } else if (error.response.status === HttpStatusCode.Forbidden) {
        toast.warn(ERROR_MESSAGE.forbidden)
      } else if (error.response.status === HttpStatusCode.PayloadTooLarge) {
        toast.error(ERROR_MESSAGE.payload_too_large)
      }

      return Promise.reject(error)
    })

    return () => {
      client.interceptors.response.eject(interceptorId.current)
    }
  }, [])

  return null
}

export default ResponseInterceptor
