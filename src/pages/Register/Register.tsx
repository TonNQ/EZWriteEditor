import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { cn } from '../../libs/tailwind/utils'
import { path } from '../../routes/path'
import { AppDispatch, RootState } from '../../store'
import { registerThunk, resetAuthState } from '../../store/auth/auth.slice'
import { setFormErrors } from '../../utils/formError'
import { authSchema, AuthSchemaType } from '../../utils/rules'

type FormData = Pick<AuthSchemaType, 'email' | 'password' | 'confirm_password' | 'first_name' | 'last_name'>
const registerSchema = authSchema.pick(['email', 'password', 'confirm_password', 'first_name', 'last_name'])

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { registerInProgress, registerError } = useSelector((state: RootState) => state.auth)

  const { control, handleSubmit, setError } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  useEffect(() => {
    return () => {
      dispatch(resetAuthState())
    }
  }, [dispatch])

  useEffect(() => {
    setFormErrors(registerError, setError)
  }, [registerError, setError])

  const onSubmit = handleSubmit(async (data: FormData) => {
    const { confirm_password, ...registerData } = data
    try {
      await dispatch(registerThunk(registerData)).unwrap()
      navigate(path.home)
    } catch (error) {
      // Error is handled by the reducer and useEffect
    }
  })

  return (
    <div className='flex w-full min-w-[400px] flex-col'>
      <h1 className='text-left text-3xl font-semibold tracking-wide text-blue-900 uppercase'>Register</h1>
      {/* <p className='text-neutral-5 mt-1 text-sm tracking-wide'>để trở thành thành viên mới của cộng đồng chúng tôi</p> */}
      <div className='text-semantic-cancelled mt-4 min-h-[15px] text-sm leading-[15px] font-semibold'>
        {typeof registerError === 'string' ? registerError : null}
      </div>
      <form action='' className='mt-4' onSubmit={onSubmit}>
        <Input name='email' control={control} type='text' placeholder='Enter your email' labelName='Email' />
        <div className='flex gap-4'>
          <Input
            name='first_name'
            control={control}
            type='text'
            placeholder='Enter your first name'
            labelName='First name'
          />
          <Input
            name='last_name'
            control={control}
            type='text'
            placeholder='Enter your last name'
            labelName='Last name'
          />
        </div>
        <Input
          name='password'
          control={control}
          type='password'
          placeholder='Enter your password'
          labelName='Password'
        />
        <Input
          name='confirm_password'
          control={control}
          type='password'
          placeholder='Enter your password'
          labelName='Confirm password'
        />
        <Button
          title='Register'
          type='submit'
          classButton='bg-blue-800/90 hover:bg-blue-800 mt-4 rounded-md cursor-pointer'
          classTitle='uppercase font-semibold text-neutral-50 test-base tracking-wide'
          classWrapperLoading={cn('', {
            block: registerInProgress
          })}
          disabled={registerInProgress}
        />
        <div className='mt-4 flex w-full items-center justify-center gap-2'>
          <span className='text-sm font-medium text-neutral-600'>Do you have an account?</span>
          <Link to={path.login} className='text-sm font-medium text-blue-800/80 hover:text-blue-800/100'>
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
