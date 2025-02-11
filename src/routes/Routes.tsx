import React, { Fragment, lazy, Suspense } from 'react'
import { Navigate, Route, Routes as Switch } from 'react-router-dom'

// configs
import { PATH_NAME, USER_ROLE } from '@/configs'

// types

// layouts
// import MainLayout from 'layouts/MainLayout'

// containers
import AuthGuard from '@/guards/AuthGuard'
import GuestGuard from '@/guards/GuestGuard'

// route
import RoleRoute from './RoleRoute'
import { IRoutes } from '@/types/route.type'

// modules
const Error404View = lazy(() => import('@/pages/Error404View'))
const DenyView = lazy(() => import('@/pages/DenyView'))
const Login = lazy(() => import('@/pages/Login'))

const routesConfig: IRoutes[] = [
  {
    path: '/',
    component: () => <Navigate to={PATH_NAME.ERROR_403} />
  },
  {
    path: PATH_NAME.ERROR_404,
    component: Error404View
  },
  {
    guard: GuestGuard,
    path: PATH_NAME.LOGIN,
    component: Login
  },
  {
    path: PATH_NAME.ERROR_403,
    component: DenyView
  },
  {
    path: '*',
    routes: [
      {
        path: '/app',
        component: Error404View
      },
      {
        component: () => <Navigate to={PATH_NAME.ERROR_404} />
      }
    ]
  }
]

const renderRoutes = (routes: IRoutes[]) => {
  return (
    <>
      {routes ? (
        <Suspense fallback={<div />}>
          <Switch>
            {routes.map((route: IRoutes, idx: number) => {
              const Guard = route.guard || Fragment
              const Layout = route.layout || Fragment
              const Component = route.component
              const requireRoles = route.requireRoles || []

              return (
                <Route
                  key={`routes-${idx}`}
                  path={route.path}
                  element={
                    <Guard>
                      <Layout>
                        {route.routes ? (
                          renderRoutes(route.routes)
                        ) : (
                          <RoleRoute requireRoles={requireRoles}>
                            <Component />
                          </RoleRoute>
                        )}
                      </Layout>
                    </Guard>
                  }
                />
              )
            })}
          </Switch>
        </Suspense>
      ) : null}
    </>
  )
}

const Routes = () => {
  return renderRoutes(routesConfig)
}

export default Routes
