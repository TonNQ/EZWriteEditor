interface ItalicIconProps {
  width?: number
  height?: number
}

const ItalicIcon = ({ width = 18, height = 18 }: ItalicIconProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke='#686868'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M11 5h6M7 19h6m1-14l-4 14'
      ></path>
    </svg>
  )
}

export default ItalicIcon
