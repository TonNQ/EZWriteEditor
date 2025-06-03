interface ArrowLeftProps {
  width?: number
  height?: number
  className?: string
  onClick?: () => void
}

const ArrowLeft = ({ width = 18, height = 18, className = 'text-gray-500', onClick }: ArrowLeftProps) => {
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
        strokeWidth={2}
        d='M5 12h14M5 12l6 6m-6-6l6-6'
      ></path>
    </svg>
  )
}

export default ArrowLeft
