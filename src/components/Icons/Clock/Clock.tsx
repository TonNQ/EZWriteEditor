interface ClockProps {
  width?: number
  height?: number
  className?: string
  onClick?: () => void
}

const Clock = ({ width = 18, height = 18, className = 'text-gray-500', onClick }: ClockProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      className={className}
      onClick={onClick}
    >
      <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5}>
        <circle cx={12} cy={12} r={9}></circle>
        <path d='M11 8v5h5'></path>
      </g>
    </svg>
  )
}

export default Clock
