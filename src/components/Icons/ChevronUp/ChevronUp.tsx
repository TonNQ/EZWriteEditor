interface ChevronUpProps {
  width?: number
  height?: number
}

const ChevronUp = ({ width = 12, height = 12 }: ChevronUpProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke='#686868'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='m6 15l6-6l6 6'
      ></path>
    </svg>
  )
}

export default ChevronUp
