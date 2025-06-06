interface HistoryProps {
  width?: number
  height?: number
  className?: string
  onClick?: () => void
}

const History = ({ width = 18, height = 18, className = 'text-gray-500', onClick }: HistoryProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' className={className} onClick={onClick}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.079 5.069c3.795-3.79 9.965-3.75 13.783.069c3.82 3.82 3.86 9.993.064 13.788s-9.968 3.756-13.788-.064a9.81 9.81 0 0 1-2.798-8.28a.75.75 0 1 1 1.487.203a8.31 8.31 0 0 0 2.371 7.017c3.245 3.244 8.468 3.263 11.668.064c3.199-3.2 3.18-8.423-.064-11.668c-3.243-3.242-8.463-3.263-11.663-.068l.748.003a.75.75 0 1 1-.007 1.5l-2.546-.012a.75.75 0 0 1-.746-.747L3.575 4.33a.75.75 0 1 1 1.5-.008zm6.92 2.18a.75.75 0 0 1 .75.75v3.69l2.281 2.28a.75.75 0 1 1-1.06 1.061l-2.72-2.72V8a.75.75 0 0 1 .75-.75'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default History
