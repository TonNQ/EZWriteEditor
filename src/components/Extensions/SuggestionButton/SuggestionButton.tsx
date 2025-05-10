import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { setIsOpenSuggestion } from '../../../store/suggestion/suggestion.slice'
import Suggestion from '../../Icons/Suggestion'
import BaseButton from '../BaseButton'

const SuggestionButton = () => {
  const dispatch = useDispatch()
  const isOpenSuggestion = useSelector((state: RootState) => state.suggestion.isOpenSuggestion)

  const toggleOpenSuggestion = () => {
    dispatch(setIsOpenSuggestion(!isOpenSuggestion))
  }

  return (
    <BaseButton onClick={toggleOpenSuggestion} isActive={isOpenSuggestion}>
      <Suggestion width={20} height={20} className='text-gray-default' />
    </BaseButton>
  )
}

export default SuggestionButton
