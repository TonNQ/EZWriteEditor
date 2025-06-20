interface CloseProps {
  width?: number
  height?: number
  onClick?: () => void
  className?: string
}

const Close = ({ width = 18, height = 18, onClick, className }: CloseProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      onClick={onClick}
      className={className}
    >
      <path
        fill='#686868'
        d='m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z'
      ></path>
    </svg>
  )
}

export default Close
