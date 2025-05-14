interface ImportProps {
  width?: number
  height?: number
}

const Import = ({ width = 18, height = 18 }: ImportProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 36 36'>
      <path
        fill='#686868'
        d='M28 4H14.87L8 10.86V15h2v-1.39h7.61V6H28v24H8a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m-12 8h-6v-.32L15.7 6h.3Z'
        className='clr-i-outline clr-i-outline-path-1'
        strokeWidth={0.4}
        stroke='#686868'
      ></path>
      <path
        fill='#686868'
        d='M11.94 26.28a1 1 0 1 0 1.41 1.41L19 22l-5.68-5.68a1 1 0 0 0-1.41 1.41L15.2 21H3a1 1 0 1 0 0 2h12.23Z'
        className='clr-i-outline clr-i-outline-path-2'
        strokeWidth={0.4}
        stroke='#686868'
      ></path>
      <path fill='none' d='M0 0h36v36H0z'></path>
    </svg>
  )
}

export default Import
