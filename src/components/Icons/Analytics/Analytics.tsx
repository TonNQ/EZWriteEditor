interface AnalyticsProps {
  width?: number
  height?: number
  className?: string
  onClick?: () => void
}

const Analytics = ({ width = 18, height = 18, className = 'text-gray-500', onClick }: AnalyticsProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      className={className}
      onClick={onClick}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.6}
        d='M8 16v-5m4 5V8m4 8v-2m2-10H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2'
      ></path>
    </svg>
  )
}

export default Analytics
