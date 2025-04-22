interface AlignRightIconProps {
  width?: number
  height?: number
}

const AlignRightIcon = ({ width = 20, height = 20 }: AlignRightIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
    <path fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M8 12h8M6 18h12"></path>
  </svg>
  )
}

export default AlignRightIcon
