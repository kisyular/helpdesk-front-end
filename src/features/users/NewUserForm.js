import React from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ROLES } from '../../config/roles'
import { SimpleErrorMessage } from '../../components/Status'
import UserFormName from './UserFormName'
import UserFormPassword from './UserFormPassword'
import FormSelect from '../../components/FormSelect'

const USER_REGEX = /^[A-z]{3,20}$/
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
			<option
				key={role}
				value={role}
				className='h-8 w-full my-2 text-lg font-bold'
			>
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
	let errorMessage

	if (isError) {
		errorMessage = (
			<SimpleErrorMessage
				errorMessage={error?.data?.message}
				errorHead='Error while adding user'
			/>
		)
	}

	return (
		<div className='flex items-center justify-center'>
			<form className='w-full max-w-2xl' onSubmit={onSaveUserClicked}>
				<div className='mb-10 px-3'>{errorMessage}</div>
				<UserFormName
					name={name}
					setName={setName}
					username={username}
					setUsername={setUsername}
					validUsername={validUsername}
				/>
				<UserFormPassword
					password={password}
					setPassword={setPassword}
					validPassword={validPassword}
				/>
				<div className='flex flex-wrap mb-6 items-center space-x-5'>
					<div className='w-full px-3 mb-6 md:mb-0'>
						<FormSelect
							label='roles'
							options={options}
							value={roles}
							onChange={onRolesChanged}
						/>
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
