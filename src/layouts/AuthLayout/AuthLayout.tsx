import { useEffect, useState } from 'react'
import DutactLogo from '../../assets/dutact-logo.png'

interface Props {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  const [_isHiddenImage, setIsHiddenImage] = useState<boolean>(false)

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 938) {
        setIsHiddenImage(true)
      } else {
        setIsHiddenImage(false)
      }
    }
    checkScreenWidth()
    window.addEventListener('resize', checkScreenWidth)
    return () => {
      window.removeEventListener('resize', checkScreenWidth)
    }
  }, [])

  return (
    <div className='flex h-screen w-full'>
      <div className='flex w-1/2 items-center justify-center'>
        <div className='flex h-full w-full max-w-[60%] items-center justify-center'>{children}</div>
      </div>
      <div className='relative flex w-1/2 items-center justify-center overflow-hidden bg-blue-900'>
        {/* Offset circular pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-[50%] right-[-100px] -translate-y-1/2 transform'>
            <div className='h-[1000px] w-[1000px] rounded-full border border-white'></div>
            <div className='absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-blue-500'></div>
            <div className='absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-blue-500'></div>
            <div className='absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-blue-500'></div>
            <div className='absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-blue-500'></div>
            <div className='absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-blue-500'></div>
            <div className='absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-blue-500'></div>
            <div className='absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-blue-500'></div>
            <div className='absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-blue-500'></div>
            <div className='absolute top-1/2 left-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-blue-500'></div>
          </div>
        </div>

        <div className='items-left relative z-10 flex h-full w-full max-w-[60%] flex-col justify-center gap-4 pb-12'>
          <img src={DutactLogo || '/placeholder.svg'} alt='Dutact Logo' className='-ml-2 h-16 w-16' />
          <h1 className='max-w-[80%] text-left text-5xl leading-16 font-bold text-neutral-100'>Welcome to EZWrite.</h1>
          <p className='ml-12 max-w-[80%] text-left text-sm leading-6 font-normal text-neutral-200'>
            EZWrite helps you draft English documents with smart, context-aware suggestions. Write naturally, express
            your ideas with confidence.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
