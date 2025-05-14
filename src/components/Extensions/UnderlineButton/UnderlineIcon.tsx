interface UnderlineIconProps {
  width?: number
  height?: number
}

const UnderlineIcon = ({ width = 18, height = 18 }: UnderlineIconProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke='#686868'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M7 5v5a5 5 0 0 0 10 0V5M5 19h14'
      ></path>
    </svg>
  )
}

export default UnderlineIcon
