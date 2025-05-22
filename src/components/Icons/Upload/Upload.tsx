interface UploadProps {
  width?: number
  height?: number
}

const Upload = ({ width = 18, height = 18 }: UploadProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke='#686868'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4 16.004V17a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-8-.5v-11M15.5 8L12 4.5L8.5 8'
      ></path>
    </svg>
  )
}

export default Upload
