interface FilledChevronDownProps {
  width?: number
  height?: number
}

const FilledChevronDown = ({ width = 12, height = 12 }: FilledChevronDownProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path fill='#686868' d='M18.53 9.53a.75.75 0 0 0 0-1.06H5.47a.75.75 0 0 0 0 1.06l6 6a.75.75 0 0 0 1.06 0z'></path>
    </svg>
  )
}

export default FilledChevronDown
