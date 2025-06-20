interface SortDateAscProps {
  width?: number
  height?: number
  className?: string
}

const SortDateAsc = ({ width = 24, height = 24, className = 'text-gray-600' }: SortDateAscProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='M21 17h3l-4 4l-4-4h3V3h2zM8 16h3v-3H8zm5-11h-1V3h-2v2H6V3H4v2H3c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h10c1.11 0 2-.89 2-2V7c0-1.11-.89-2-2-2M3 18v-7h10v7z'
      ></path>
    </svg>
  )
}

export default SortDateAsc
