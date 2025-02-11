import { ComponentType, FunctionComponent, LazyExoticComponent } from 'react'

type ICommon = {
  exact?: boolean
  path?: string
  guard?: LazyExoticComponent<ComponentType<any>> | ComponentType<any>
  layout?: FunctionComponent
  component?: any
  requireRoles?: string[] | []
}

export type IRoutes = ICommon & {
  routes?: ICommon[]
}

export type IParams = {
  id?: string
}
