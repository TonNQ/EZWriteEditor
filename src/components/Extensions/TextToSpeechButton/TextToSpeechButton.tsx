import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { setIsOpenTextToSpeech } from '../../../store/textToSpeech/textToSpeech.slice'
import TextToSpeech from '../../Icons/TextToSpeech'
import BaseButton from '../BaseButton'

const TextToSpeechButton = () => {
  const dispatch = useDispatch()
  const isOpenTextToSpeech = useSelector((state: RootState) => state.textToSpeech.isOpenTextToSpeech)

  const toggleOpenTextToSpeech = () => {
    dispatch(setIsOpenTextToSpeech(!isOpenTextToSpeech))
  }

  return (
    <BaseButton onClick={toggleOpenTextToSpeech} isActive={isOpenTextToSpeech}>
      <TextToSpeech width={18} height={18} className='text-gray-default' />
    </BaseButton>
  )
}

export default TextToSpeechButton
