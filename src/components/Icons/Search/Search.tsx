interface SearchProps {
  width?: number
  height?: number
  className?: string
}

const Search = ({ width = 18, height = 18, className = 'text-gray-400' }: SearchProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7'
      ></path>
    </svg>
  )
}

export default Search
