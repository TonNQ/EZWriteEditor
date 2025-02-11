import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'

// configs
import { PATH_NAME } from '@/configs'
import useLocalStorage from '@/hooks/useLocalStorage'

interface IProps {
  children: React.ReactNode
}

const AuthGuard: FC<IProps> = ({ children }) => {
  const [isAuth] = useLocalStorage<string>('access_token')

  if (!isAuth) return <Navigate to={PATH_NAME.LOGIN} />

  return <>{children}</>
}

export default AuthGuard
