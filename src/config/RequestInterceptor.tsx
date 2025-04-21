import { useEffect, useRef } from 'react'
import { client } from './queryClient'
// import { useLocation } from 'react-router-dom'

const RequestInterceptor = () => {
//   const location = useLocation()
  const interceptorId = useRef<any>(undefined)

  const setInterceptor = () => {
    const accessToken = localStorage.getItem('access_token')
    const tokenString = accessToken ? JSON.parse(accessToken).toString() : ''

    interceptorId.current = client.interceptors.request.use(
      (config: any) => {
        if (tokenString) {
          config.headers.Authorization = `Bearer ${tokenString}`
        }
        return config
      },
      (error: any) => Promise.reject(error)
    )
  }

  const onStorageChange = () => {
    if (interceptorId.current !== undefined) {
      client.interceptors.request.eject(interceptorId.current)
    }
    setInterceptor()
  }

  useEffect(() => {
    setInterceptor()
    window.addEventListener('storage', onStorageChange)

    return () => {
      window.removeEventListener('storage', onStorageChange)
      if (interceptorId.current !== undefined) {
        client.interceptors.request.eject(interceptorId.current)
      }
    }
  }, [])

  return null
}

export default RequestInterceptor