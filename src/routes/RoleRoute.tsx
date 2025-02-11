import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// configs
import { PATH_NAME } from '@/configs'

type IProps = {
  requireRoles: string[] | []
  children: React.ReactNode
}

const RoleRoute: FC<IProps> = ({ children, requireRoles = [] }) => {
  const navigate = useNavigate()
  const role = 'STUDENT'

  useEffect(() => {
    if (!role || requireRoles.length === 0) return

    const checkRole = requireRoles.includes(role)
    if (!checkRole) {
      navigate(PATH_NAME.ERROR_403)
    }
  }, [history, role, requireRoles])

  return <>{children}</>
}

export default RoleRoute
