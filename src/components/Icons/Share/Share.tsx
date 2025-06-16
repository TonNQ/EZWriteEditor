interface ShareProps {
  width?: number
  height?: number
  className?: string
}

const Share = ({ width = 24, height = 24, className = 'text-[#686868]' }: ShareProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' className={className}>
      <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}>
        <circle cx={18} cy={5} r={3}></circle>
        <circle cx={6} cy={12} r={3}></circle>
        <circle cx={18} cy={19} r={3}></circle>
        <path d='m8.5 13.5l7 4m0-11l-7 4'></path>
      </g>
    </svg>
  )
}

export default Share
