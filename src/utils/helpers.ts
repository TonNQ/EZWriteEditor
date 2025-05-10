export const getInitialFromName = (name: string) => {
  if (!name) return ''
  const words = name.trim().split(' ')
  const lastWord = words[words.length - 1]
  return lastWord.charAt(0).toUpperCase()
}

export const getRandomDarkColor = () => {
  const r = Math.floor(Math.random() * 156) + 50
  const g = Math.floor(Math.random() * 156) + 50
  const b = Math.floor(Math.random() * 156) + 50

  const backgroundColor = `rgb(${r},${g},${b})`

  return backgroundColor
}
