'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Form = () => {
  const { data: session } = useSession()
  const params = useSearchParams()
  const router = useRouter()
  const callbackUrl = params.get('callbackUrl') || '/'

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  useEffect(() => {
    if (session?.user) {
      router.push(callbackUrl)
    }
  }, [session, callbackUrl, router])

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      if (res.ok) {
        router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account created`
        )
      } else {
        const data = await res.json()
        throw new Error(data.message)
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf('E11000') === 0
          ? 'Email is duplicate'
          : err.message
      toast.error(error || 'error')
    }
  }

  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title text-center">Register</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              type="text"
              id="name"
              autoComplete="name"
              {...register('name', { required: 'Name is required' })}
              className="input input-bordered w-full"
            />
            {errors.name?.message && (
              <div className="text-error">{errors.name.message}</div>
            )}
          </div>

          <div className="my-2">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
                  message: 'Invalid email',
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.email?.message && (
              <div className="text-error">{errors.email.message}</div>
            )}
          </div>

          <div className="my-2">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              {...register('password', { required: 'Password is required' })}
              className="input input-bordered w-full"
            />
            {errors.password?.message && (
              <div className="text-error">{errors.password.message}</div>
            )}
          </div>

          <div className="my-2">
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === getValues('password') || 'Passwords must match',
              })}
              className="input input-bordered w-full"
            />
            {errors.confirmPassword?.message && (
              <div className="text-error">{errors.confirmPassword.message}</div>
            )}
          </div>

          <div className="my-4">
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Register
            </button>
          </div>
        </form>

        <div className="divider"></div>
        <div className="text-center">
          Already have an account?{' '}
          <Link
            className="link text-primary"
            href={`/signin?callbackUrl=${callbackUrl}`}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Form
