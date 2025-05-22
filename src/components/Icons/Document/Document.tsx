interface DocumentProps {
  width?: number
  height?: number
}

const Document = ({ width = 18, height = 18 }: DocumentProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 48 48'>
      <path fill='#2095f5' d='M40 45H8V3h22l10 10z'></path>
      <path fill='#218aec' d='M38.5 14H29V4.5z'></path>
      <path fill='#f7f7f7' d='M16 21h17v2H16zm0 4h13v2H16zm0 4h17v2H16zm0 4h13v2H16z'></path>
    </svg>
  )
}

export default Document
