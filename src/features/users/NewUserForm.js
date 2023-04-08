import React from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ROLES } from '../../config/roles'
import { Error } from '../../components/Status'

const USER_REGEX = /^[A-z]{3,20}$/
// const PWD_REGEX =
// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/ // 4-12 chars, no spaces

const NewUserForm = () => {
	const [addNewUser, { isLoading, isSuccess, isError, error }] =
		useAddNewUserMutation()
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [validUsername, setValidUsername] = useState(false)
	const [password, setPassword] = useState('')
	const [validPassword, setValidPassword] = useState(false)
	const [roles, setRoles] = useState(['Employee'])

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username))
	}, [username])

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password))
	}, [password])

	useEffect(() => {
		if (isSuccess) {
			setUsername('')
			setPassword('')
			setRoles([])
			navigate('/dash/users')
		}
	}, [isSuccess, navigate])

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions, //HTMLCollection
			(option) => option.value
		)
		setRoles(values)
	}

	const canSave =
		[roles.length, validUsername, validPassword].every(Boolean) &&
		!isLoading

	const options = Object.values(ROLES).map((role) => {
		return (
			<option key={role} value={role}>
				{role}
			</option>
		)
	})

	const onSaveUserClicked = async (e) => {
		e.preventDefault()
		if (canSave) {
			await addNewUser({ username, password, roles, name })
		}
	}

	if (isError) {
		return <Error error={error?.data?.message} />
	}

	return (
		<div className='flex items-center justify-center'>
			<form className='w-full max-w-2xl' onSubmit={onSaveUserClicked}>
				<div className='flex flex-wrap mb-6'>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='name'
						>
							Full Name
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
							id='name'
							type='text'
							placeholder='Jane Doe'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='w-full md:w-1/2 px-3'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='username'
						>
							Username
						</label>
						<input
							className='appearance-none block w-full mb-1 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='username'
							type='text'
							placeholder='janedoe'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						{!validUsername && (
							<p className='text-red-600 text-xs italic'>
								Username must be 3-20 characters long and should
								NOT contain special characters, spaces or
								numbers.
							</p>
						)}
					</div>
				</div>
				<div className='flex flex-wrap mb-6'>
					<div className='w-full px-3'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='grid-password'
						>
							Password
						</label>
						<input
							className='appearance-none block text-gray-900 w-full bg-gray-200 text-gray-700border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-password'
							type='password'
							placeholder='******************'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{!validPassword && (
							<p className='text-red-600 text-xs italic'>
								Password must be a minimum 4 characters long and
								should NOT contain spaces.
							</p>
						)}
					</div>
				</div>

				<div className='flex flex-wrap mb-6'>
					<div className='w-full px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='grid-state'
						>
							Select User Role
						</label>
						<div className='relative'>
							<select
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-state'
								multiple
								size={2}
								value={roles}
								onChange={onRolesChanged}
							>
								{options}
							</select>
						</div>
					</div>
				</div>

				<div className='flex flex-wrap'>
					<div className='w-full px-3'>
						<button
							className='bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60 disabled:cursor-not-allowed'
							type='submit'
							disabled={!canSave}
						>
							Add User
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default NewUserForm
