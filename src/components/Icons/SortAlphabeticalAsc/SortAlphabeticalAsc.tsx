interface SortAlphabeticalAscProps {
  width?: number
  height?: number
  className?: string
}

const SortAlphabeticalAsc = ({ width = 24, height = 24, className = 'text-gray-600' }: SortAlphabeticalAscProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='M19 17h3l-4 4l-4-4h3V3h2m-8 10v2l-3.33 4H11v2H5v-2l3.33-4H5v-2M9 3H7c-1.1 0-2 .9-2 2v6h2V9h2v2h2V5a2 2 0 0 0-2-2m0 4H7V5h2Z'
      ></path>
    </svg>
  )
}

export default SortAlphabeticalAsc
