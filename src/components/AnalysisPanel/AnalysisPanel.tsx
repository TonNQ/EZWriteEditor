import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { fetchContent, fetchGrammar, fetchParaphrase, fetchVocabulary } from '../../store/explanation/explanation.slice'
import Analytics from '../Icons/Analytics'
import LoadingIndicator from '../LoadingIndicator'
import { AnalysisTabs } from './AnalysisTabs'

const AnalysisPanel = () => {
  const dispatch: AppDispatch = useDispatch()
  const { selectedSentence, context, analysisData } = useSelector((state: RootState) => state.explanation || {})
  const [suggestedSentence, setSuggestedSentence] = useState<string>('')

  useEffect(() => {
    if (selectedSentence) {
      setSuggestedSentence(selectedSentence)
      dispatch(fetchVocabulary({ suggested_sentence: selectedSentence, context }))
      dispatch(fetchGrammar({ suggested_sentence: selectedSentence, context }))
      dispatch(fetchContent({ suggested_sentence: selectedSentence, context }))
      dispatch(fetchParaphrase({ suggested_sentence: selectedSentence, context }))
    }
  }, [selectedSentence, context, dispatch])

  if (!analysisData) {
    return (
      <div className='flex w-full items-center justify-center'>
        <LoadingIndicator classWrapper='block' classLoadingIndicator='text-gray-700' />
      </div>
    )
  }

  return (
    <div className='w-full'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Analytics className='text-yellow-500' width={20} height={20} />
          <h2 className='text-base font-semibold text-gray-800'>Analysis</h2>
        </div>
        {/* Language Switcher hidden, default is 'vi' */}
      </div>
      <div className='space-y-4'>
        {/* Analysis Tabs */}
        <AnalysisTabs
          suggestedSentence={suggestedSentence}
          context={context}
          vocabulary={analysisData.vocabulary}
          grammar={analysisData.grammar}
          content={analysisData.content}
          paraphrase={analysisData.paraphrase}
        />
      </div>
    </div>
  )
}

export default AnalysisPanel
