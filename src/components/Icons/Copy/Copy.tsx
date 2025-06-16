interface CopyProps {
  width?: number
  height?: number
  className?: string
}

const Copy = ({ width = 20, height = 20, className = 'text-gray-500' }: CopyProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
  >
    <rect x='9' y='9' width='13' height='13' rx='2' stroke='currentColor' strokeWidth='2' />
    <rect x='2' y='2' width='13' height='13' rx='2' stroke='currentColor' strokeWidth='2' />
  </svg>
)

export default Copy
