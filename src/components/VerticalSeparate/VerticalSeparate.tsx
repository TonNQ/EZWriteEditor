import { cn } from '../../libs/tailwind/utils'

interface VerticalSeparateProps {
  customClass?: string
}

const VerticalSeparate = ({ customClass = '' }: VerticalSeparateProps) => {
  return <div className={cn('mx-2 h-6 w-px bg-gray-300', customClass)} />
}

export default VerticalSeparate
