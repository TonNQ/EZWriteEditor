interface SearchReplaceIconProps {
  width?: number
  height?: number
}

const SearchReplaceIcon = ({ width = 18, height = 18 }: SearchReplaceIconProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke='#686868'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M17.5 17.5L22 22m-2-11a9 9 0 0 1-17.064 4M2 11a9 9 0 0 1 17.065-4m0 0V2m0 5H14.5M2.936 15v5m0-5H7.5'
        color='#686868'
      ></path>
    </svg>
  )
}

export default SearchReplaceIcon
