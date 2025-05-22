interface BoldIconProps {
  width?: number
  height?: number
}

const BoldIcon = ({ width = 18, height = 18 }: BoldIconProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke='#686868'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M7 5h6a3.5 3.5 0 0 1 0 7H7zm6 7h1a3.5 3.5 0 0 1 0 7H7v-7'
      ></path>
    </svg>
  )
}

export default BoldIcon
