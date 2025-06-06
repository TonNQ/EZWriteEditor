interface LogOutProps {
  width?: number
  height?: number
}

const LogOut = ({ width = 18, height = 18 }: LogOutProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke='#ee0707'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M13.496 21H6.5c-1.105 0-2-1.151-2-2.571V5.57c0-1.419.895-2.57 2-2.57h7M16 15.5l3.5-3.5L16 8.5m-6.5 3.496h10'
      ></path>
    </svg>
  )
}

export default LogOut
