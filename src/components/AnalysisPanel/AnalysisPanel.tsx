import { useEffect, useState } from 'react'
import Analytics from '../Icons/Analytics'
import sentencesInstance from '../../services/sentences.api'
import { AnalysisLanguage, MultiLanguageAnalysis } from '../../types/analysis.type'
import { FileText } from 'lucide-react'
import { AnalysisTabs } from './AnalysisTabs'
import { LanguageSwitcher } from './LanguageSwitcher'
import { SentenceContextDisplay } from './SentenceContextDisplay'
import { sampleMultiLanguageAnalysis } from './data/sample-data'

interface AnalysisPanelProps {
  originalSentence: string
  suggestedSentence: string
  context: string
  analysis: MultiLanguageAnalysis | null
}

// const AnalysisPanel = ({ originalSentence, suggestedSentence, context, analysis }: AnalysisPanelProps) => {
const AnalysisPanel = () => {
  const [currentLanguage, setCurrentLanguage] = useState<AnalysisLanguage>('en')
  const [originalSentence, setOriginalSentence] = useState<string>(
    'Exercise plays a vital role in maintaining a healthy lifestyle.'
  )
  const [suggestedSentence, setSuggestedSentence] = useState<string>(
    'It also boosts the immune system and reduces the risk of chronic illnesses such as diabetes, high blood pressure, and obesity.'
  )
  const [context, setContext] = useState<string>(
    'Exercise plays a vital role in maintaining a healthy lifestyle. Regular physical activity helps strengthen the heart, muscles, and bones while improving flexibility and coordination.'
  )
  const [analysis, setAnalysis] = useState<MultiLanguageAnalysis | null>(sampleMultiLanguageAnalysis)

  // useEffect(() => {
  //   const fetchAnalysis = async () => {
  //     const response = await sentencesInstance.getExplanation({
  //       original_sentence: originalSentence,
  //       suggested_sentence: suggestedSentence,
  //       context: context,
  //       language: currentLanguage
  //     })
  //     setAnalysis({ en: response.data.analysis, vi: response.data.analysis })
  //   }
  //   fetchAnalysis()
  // }, [originalSentence, suggestedSentence, context, currentLanguage])

  if (!analysis) {
    return (
      <div className='flex h-64 flex-col items-center justify-center text-gray-500'>
        <FileText className='mb-4 h-12 w-12 opacity-50' />
        <p className='text-sm'>Select a sentence to view detailed analysis</p>
      </div>
    )
  }

  const currentAnalysis = analysis[currentLanguage]

  return (
    <div className='w-full'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Analytics className='text-yellow-500' width={20} height={20} />
          <h2 className='text-base font-semibold text-gray-800'>Analysis</h2>
        </div>
        {/* Language Switcher */}
        <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      </div>
      <div className='space-y-4'>
        {/* Analysis Tabs */}
        <AnalysisTabs
          originalSentence={originalSentence}
          suggestedSentence={suggestedSentence}
          context={context}
          analysis={currentAnalysis}
        />
      </div>
    </div>
  )
}

export default AnalysisPanel
