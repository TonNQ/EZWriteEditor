interface CheckFillProps {
  width?: number
  height?: number
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const CheckFill = ({
  width = 12,
  height = 12,
  className = 'text-green-500',
  onClick,
  disabled = false
}: CheckFillProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      className={className}
      onClick={disabled ? undefined : onClick}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default CheckFill
