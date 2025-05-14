interface FolderProps {
  width?: number
  height?: number
  className?: string
}

const Folder = ({ width = 18, height = 18, className = 'text-gray-600' }: FolderProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='M20 18H4V8h16m0-2h-8l-2-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2'
      ></path>
    </svg>
  )
}

export default Folder
