import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { setIsOpenExplanation } from '../../../store/suggestion/suggestion.slice'
import BaseButton from '../BaseButton'
import Analytics from '../../Icons/Analytics'

const ExplanationButton = () => {
  const dispatch = useDispatch()
  const isOpenExplanation = useSelector((state: RootState) => state.suggestion.isOpenExplanation)

  const toggleOpenExplanation = () => {
    dispatch(setIsOpenExplanation(!isOpenExplanation))
  }

  return (
    <BaseButton onClick={toggleOpenExplanation} isActive={isOpenExplanation}>
      <Analytics width={18} height={18} className='text-gray-default' />
    </BaseButton>
  )
}

export default ExplanationButton
