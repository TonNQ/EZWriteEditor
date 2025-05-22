interface DictionaryProps {
  width?: number
  height?: number
  className?: string
}

const Dictionary = ({ width = 18, height = 18, className = 'text-gray-600' }: DictionaryProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 14 14'
      className={className}
      stroke='currentColor'
    >
      <g fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth={1}>
        <path d='M12.5 13.5H3a1.5 1.5 0 1 1 0-3h8.5a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H3a1.5 1.5 0 0 0-1.5 1.46v10m10-1.46v3'></path>
        <path d='M8.051 5.002h2.316l-2.46 3.473h2.604M3.512 5.986l1.066-3.199a.4.4 0 0 1 .38-.274v0c.173 0 .327.11.382.274l1.066 3.199M3.898 4.828H6.02'></path>
      </g>
    </svg>
  )
}

export default Dictionary
