interface ChevronDownProps {
  width?: number
  height?: number
}

const ChevronDown = ({ width = 12, height = 12 }: ChevronDownProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke='#686868'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='m6 9l6 6l6-6'
      ></path>
    </svg>
  )
}

export default ChevronDown
