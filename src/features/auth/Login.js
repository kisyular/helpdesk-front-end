import React, { useRef, useState, useEffect } from 'react'
import Logo from '../../images/favicon.png'
import Button from '../../components/Button'
import { Loading } from '../../components/Status'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const userRef = useRef()
	const errRef = useRef()
	const [errMsg, setErrMsg] = useState('')
	const [persist, setPersist] = usePersist()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [login, { isLoading }] = useLoginMutation()

	useEffect(() => {
		userRef.current.focus()
	}, [])

	useEffect(() => {
		setErrMsg('')
	}, [username, password])

	const handlePersist = () => {
		setPersist((prev) => !prev)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const { accessToken } = await login({ username, password }).unwrap()
			dispatch(setCredentials({ accessToken }))
			setUsername('')
			setPassword('')
			navigate('/dash')
		} catch (err) {
			if (!err.status) {
				setErrMsg('No Server Response')
			} else if (err.status === 400) {
				setErrMsg('Missing Username or Password')
			} else if (err.status === 401) {
				setErrMsg('You entered an invalid username or password')
			} else {
				setErrMsg(err.data?.message)
			}
			errRef?.current?.focus()
		}
	}

	if (isLoading) return <Loading />

	return (
		<section className='bg-black dark:bg-black landing'>
			{/* Back Button */}

			<div className='flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0'>
				<a
					href='boss'
					className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
				>
					<img className='w-8 h-8 mr-2' src={Logo} alt='logo' />
					Help Desk
				</a>
				<div className='flex justify-start mb-6'>
					<Link to='/'>
						<Button text='Back to Home' type='button' />
					</Link>
				</div>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Sign in to your account
						</h1>

						{errMsg && (
							<div ref={errRef}>
								<div
									className='bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-4 rounded-lg'
									role='alert'
								>
									<p className='font-bold'>
										Invalid Credentials
									</p>
									<p>{errMsg}</p>
								</div>
							</div>
						)}

						<form
							className='space-y-4 md:space-y-6'
							onSubmit={handleSubmit}
						>
							<div>
								<label
									htmlFor='username'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Your Username
								</label>
								<input
									type='text'
									ref={userRef}
									name='username'
									id='username'
									className='bg-gray-50 border border-white text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='username'
									required=''
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Password
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required=''
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
							<div className='flex items-center justify-between'>
								<div className='flex items-start'>
									<div className='flex items-center h-5'>
										<input
											id='checked'
											aria-describedby='checked'
											type='checkbox'
											className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
											required=''
											checked={persist}
											onChange={handlePersist}
										/>
									</div>
									<div className='ml-3 text-sm'>
										<label
											htmlFor='checked'
											className='text-white dark:text-white'
										>
											Trust this device
										</label>
									</div>
								</div>
								<a
									href='wewe'
									className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-200'
								>
									Forgot password?
								</a>
							</div>
							<Button
								text='Sign in'
								isFull={true}
								onClick={handleSubmit}
							/>
							{/* <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Don’t have an account yet?{' '}
								<Link
									to='/register'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									Sign up
								</Link>
							</p> */}
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Login
