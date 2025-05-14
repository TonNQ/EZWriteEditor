import { useLocation, useNavigate } from 'react-router-dom'
import TabBar from '../../components/TabBar'

interface MainLayoutProps {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname.replace('/', '') || 'compose'

  const handleTabChange = (tab: string) => {
    navigate(`/${tab}`)
  }

  return (
    <div className='relative h-[100vh] w-[100vw]'>
      <TabBar activeTab={currentPath} onTabChange={handleTabChange} />
      <div className='relative h-[calc(100vh-48px)] max-h-[calc(100vh-48px)] overflow-auto bg-white'>{children}</div>
    </div>
  )
}

export default MainLayout
