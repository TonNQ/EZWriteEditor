import _ from 'lodash'
import { FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { fetchAnalysis } from '../../store/explanation/explanation.slice'
import { AnalysisLanguage, MultiLanguageAnalysis } from '../../types/analysis.type'
import Analytics from '../Icons/Analytics'
import LoadingIndicator from '../LoadingIndicator'
import { AnalysisTabs } from './AnalysisTabs'
import { LanguageSwitcher } from './LanguageSwitcher'

interface AnalysisPanelProps {
  originalSentence: string
  suggestedSentence: string
  context: string
  analysis: MultiLanguageAnalysis | null
}

// const AnalysisPanel = ({ originalSentence, suggestedSentence, context, analysis }: AnalysisPanelProps) => {
const AnalysisPanel = () => {
  const dispatch: AppDispatch = useDispatch()
  const [currentLanguage, setCurrentLanguage] = useState<AnalysisLanguage>('en')
  const { selectedSentence, context, analysisData, isLoading, isError } = useSelector(
    (state: RootState) => state.explanation
  )
  const [suggestedSentence, setSuggestedSentence] = useState<string>('')

  useEffect(() => {
    if (selectedSentence) {
      setSuggestedSentence(selectedSentence)
      dispatch(
        fetchAnalysis({
          suggested_sentence: selectedSentence,
          context
        })
      )
    }
  }, [selectedSentence, context, dispatch])

  const currentAnalysis = analysisData?.analysis_both_languages?.[currentLanguage]
  console.log('analysisData', analysisData)
  if (_.isEmpty(analysisData)) {
    return (
      <div className='flex w-full items-center justify-center'>
        <LoadingIndicator classWrapper='block' classLoadingIndicator='text-gray-700' />
      </div>
    )
  }

  if (!currentAnalysis) {
    return (
      <div className='flex h-64 flex-col items-center justify-center text-gray-500'>
        <FileText className='mb-4 h-12 w-12 opacity-50' />
        <p className='text-sm'>No analysis available for this language</p>
      </div>
    )
  }

  console.log('curentAnalysis', currentAnalysis)
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
        <AnalysisTabs suggestedSentence={suggestedSentence} context={context} analysis={currentAnalysis} />
      </div>
    </div>
  )
}

export default AnalysisPanel
