import { REGEX_EMAIL } from "../constants/validate"

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

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatDate = (date: Date, includeTime = false): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  if (includeTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
  }

  return new Date(date).toLocaleDateString('en-US', options)
}

export const isValidEmail = (email: string): boolean => {
  return REGEX_EMAIL.test(email)
}