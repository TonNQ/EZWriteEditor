import { useSelector } from 'react-redux'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import TipTapEditor from '../components/TiptapEditor'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'
import Register from '../pages/Register'
import { RootState } from '../store'
import { path } from './path'

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

const RejectedRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

const useRouteElements = () => {
  return useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.home,
          element: <TipTapEditor />
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <AuthLayout>
              <Login />
            </AuthLayout>
          )
        },
        {
          path: path.register,
          element: (
            <AuthLayout>
              <Register />
            </AuthLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <AuthLayout>
          <PageNotFound />
        </AuthLayout>
      )
    }
  ])
}

export default useRouteElements
