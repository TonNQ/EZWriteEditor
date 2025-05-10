import { useState } from 'react'
import TabBar from '../../components/TabBar'

interface MainLayoutProps {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [activeTab, setActiveTab] = useState('compose')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <div className='relative h-[100vh] w-[100vw]'>
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className='relative h-[calc(100vh-52px)] max-h-[calc(100vh-52px)]'>{children}</div>
    </div>
  )
}

export default MainLayout
