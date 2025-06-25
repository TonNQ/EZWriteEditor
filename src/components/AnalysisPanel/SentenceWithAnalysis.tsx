'use client'

import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import type { SentenceAnalysis } from '../../types/analysis.type'

interface SentenceWithAnalysisProps {
  sentence: string
  analysis: SentenceAnalysis
  onAnalyze: (analysis: SentenceAnalysis) => void
  isActive: boolean
}

export function SentenceWithAnalysis({ sentence, analysis, onAnalyze, isActive }: SentenceWithAnalysisProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className={`relative inline ${isActive ? 'rounded bg-blue-50 px-1' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {sentence}
      {isHovered && (
        <button
          onClick={() => onAnalyze(analysis)}
          className='ml-1 inline-flex h-4 w-4 items-center justify-center rounded text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600'
          title='Analyze sentence'
        >
          <BarChart3 className='h-3 w-3' />
        </button>
      )}
    </span>
  )
}
