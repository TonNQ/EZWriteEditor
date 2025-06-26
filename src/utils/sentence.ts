export const getLastClosestSentences = (text: string, maxWords: number = 100): string => {
  const sentenceRegex = /[^.!?]+[.!?]?/g
  const matches = text.match(sentenceRegex) || []

  const sentences = matches.map((s) => s.trim()).filter((s) => s)

  const result: string[] = []
  let wordCount = 0

  for (let i = sentences.length - 1; i >= 0 && result.length < 3; i--) {
    const sentence = sentences[i]
    const sentenceWords = sentence.trim().split(/\s+/).length

    if (wordCount + sentenceWords <= maxWords) {
      result.unshift(sentence)
      wordCount += sentenceWords
    } else {
      break
    }
  }

  // Nếu quá 100 từ sau khi thêm đủ 3 câu, loại bỏ từ đầu cho đến khi hợp lệ
  while (wordCount > maxWords && result.length > 1) {
    const removedSentence = result.shift()
    if (removedSentence) {
      const removedWords = removedSentence.trim().split(/\s+/).length
      wordCount -= removedWords
    }
  }

  return result.join(' ')
}
