interface PlayProps {
  width?: number
  height?: number
  className?: string
}

const Play = ({ width = 24, height = 24, className = '' }: PlayProps) => {
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
        d='M8 5.14v14l11-7-11-7z'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Play
