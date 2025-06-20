interface SortDefaultProps {
  width?: number
  height?: number
  className?: string
}

const SortDefault = ({ width = 24, height = 24, className = 'text-gray-600' }: SortDefaultProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 28 28' className={className}>
      <path
        fill='currentColor'
        d='m8.352 4.011l.058-.007L8.5 4l.075.003l.126.017l.111.03l.111.044l.098.052l.104.074l.082.073l5.5 5.5a1 1 0 0 1-1.32 1.497l-.094-.083L9.5 7.415V23a1 1 0 0 1-1.993.117L7.5 23V7.415l-3.793 3.792a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.094l5.5-5.5a1 1 0 0 1 .112-.097l.11-.071l.114-.054l.105-.035zM19.5 4a1 1 0 0 1 .993.883L20.5 5v15.585l3.793-3.792l.094-.083a1 1 0 0 1 1.403 1.403l-.083.094l-5.5 5.5l-.044.041l-.068.056l-.11.071l-.114.054l-.105.035l-.117.025l-.09.01h-.118l-.06-.006l-.114-.02l-.109-.033l-.081-.034l-.098-.052l-.096-.067a1 1 0 0 1-.09-.08l-5.5-5.5l-.083-.094a1 1 0 0 1 0-1.226l.083-.094l.094-.083a1 1 0 0 1 1.226 0l.094.083l3.793 3.792V5l.007-.117A1 1 0 0 1 19.5 4'
      ></path>
    </svg>
  )
}

export default SortDefault
