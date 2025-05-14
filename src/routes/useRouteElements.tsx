import { useSelector } from 'react-redux'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import FileManagement from '../pages/FileManagement'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'
import Register from '../pages/Register'
import TipTapEditor from '../pages/TiptapEditor'
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
          element: (
            <MainLayout>
              <TipTapEditor />
            </MainLayout>
          )
        },
        {
          path: path.file,
          element: (
            <MainLayout>
              <FileManagement />
            </MainLayout>
          )
        },
        {
          path: path.compose,
          element: (
            <MainLayout>
              <TipTapEditor />
            </MainLayout>
          )
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
        <MainLayout>
          <PageNotFound />
        </MainLayout>
      )
    }
  ])
}

export default useRouteElements
