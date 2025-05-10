import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckFill from '../../components/Icons/CheckFill'
import Input from '../../components/Input'
import { cn } from '../../libs/tailwind/utils'
import { path } from '../../routes/path'
import { AppDispatch, RootState } from '../../store'
import { loginThunk, resetAuthState } from '../../store/auth/auth.slice'
import { setFormErrors } from '../../utils/formError'
import { authSchema, AuthSchemaType } from '../../utils/rules'
import Button from '../../components/Button'

type FormData = Pick<AuthSchemaType, 'email' | 'password'>
const loginSchema = authSchema.pick(['email', 'password'])

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { loginInProgress, loginError } = useSelector((state: RootState) => state.auth)

  const { control, handleSubmit, setError } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  useEffect(() => {
    return () => {
      dispatch(resetAuthState())
    }
  }, [dispatch])

  useEffect(() => {
    setFormErrors(loginError, setError)
  }, [loginError, setError])

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      await dispatch(loginThunk(data)).unwrap()
      navigate(path.home)
    } catch (error) {
      // Error is handled by the reducer and useEffect
    }
  })

  return (
    <div className='flex w-full min-w-[400px] flex-col'>
      <h1 className='text-center text-4xl font-bold tracking-wide text-blue-900 uppercase'>Login</h1>
      <div className='text-semantic-cancelled mt-4 min-h-[15px] text-sm leading-[15px] font-semibold'>
        {typeof loginError === 'string' ? loginError : null}
      </div>
      <form action='' className='mt-4' onSubmit={onSubmit}>
        <Input name='email' control={control} type='text' placeholder='Enter your email' labelName='Email' />
        <Input
          name='password'
          control={control}
          type='password'
          placeholder='Enter your password'
          labelName='Password'
        />
        {/* <div className='mt-4 flex justify-center'>
          <CheckFill
            onClick={onSubmit}
            className={cn('h-10 w-10 cursor-pointer rounded-md transition-colors', {
              'cursor-not-allowed bg-gray-400': loginInProgress,
              'bg-blue-800/90 hover:bg-blue-800': !loginInProgress
            })}
            disabled={loginInProgress}
          />
        </div> */}
        <Button
          title='Login'
          type='submit'
          classButton='bg-blue-800/90 hover:bg-blue-800 mt-4 rounded-md cursor-pointer'
          classTitle='uppercase font-semibold text-neutral-50 test-base tracking-wide'
          classWrapperLoading={cn('', {
            block: loginInProgress
          })}
          disabled={loginInProgress}
        />
        <div className='mt-4 flex w-full items-center justify-center gap-2'>
          <span className='text-sm font-medium text-neutral-600'>Don't have an account?</span>
          <Link to={path.register} className='text-sm font-medium text-blue-800/80 hover:text-blue-800/100'>
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
