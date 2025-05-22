interface PauseProps {
  width?: number
  height?: number
  className?: string
}

const Pause = ({ width = 24, height = 24, className = '' }: PauseProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M6 4h4v16H6V4zm8 0h4v16h-4V4z'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Pause
