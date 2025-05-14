import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { setIsOpenTranslation } from '../../../store/translation/translation.slice'
import Translate from '../../Icons/Translate'
import BaseButton from '../BaseButton'

const TranslateButton = () => {
  const dispatch = useDispatch()
  const isOpenTranslation = useSelector((state: RootState) => state.translation.isOpenTranslation)

  const toggleOpenTranslation = () => {
    dispatch(setIsOpenTranslation(!isOpenTranslation))
  }

  return (
    <BaseButton onClick={toggleOpenTranslation} isActive={isOpenTranslation}>
      <Translate width={18} height={18} className='text-gray-default' />
    </BaseButton>
  )
}

export default TranslateButton
