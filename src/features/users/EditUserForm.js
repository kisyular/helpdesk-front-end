import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'
import { Error } from '../../components/Status'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
	const [updateUser, { isLoading, isSuccess, isError, error }] =
		useUpdateUserMutation()

	const [
		deleteUser,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delerror },
	] = useDeleteUserMutation()

	const navigate = useNavigate()

	const [username, setUsername] = useState(user?.username)
	const [name, setName] = useState(user?.name)
	const [validUsername, setValidUsername] = useState(false)
	const [password, setPassword] = useState('')
	const [validPassword, setValidPassword] = useState(false)
	const [roles, setRoles] = useState(user?.roles)
	const [active, setActive] = useState(user?.active)

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username))
	}, [username])

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password))
	}, [password])

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setUsername('')
			setPassword('')
			setRoles([])
			navigate('/dash/users')
		}
	}, [isSuccess, isDelSuccess, navigate])

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		)
		setRoles(values)
	}

	const onActiveChanged = () => setActive((prev) => !prev)

	const onSaveUserClicked = async (e) => {
		if (password) {
			await updateUser({
				id: user.id,
				username,
				name,
				password,
				roles,
				active,
			})
		} else {
			await updateUser({
				id: user.id,
				username,
				name,
				roles,
				active,
			})
		}
	}

	const onDeleteUserClicked = async () => {
		await deleteUser({ id: user.id })
	}

	const options = Object.values(ROLES).map((role) => {
		return (
			<option key={role} value={role} className='h-8 w-full'>
				{role}
			</option>
		)
	})

	let canSave
	if (password) {
		canSave =
			[roles?.length, validUsername, validPassword].every(Boolean) &&
			!isLoading
	} else {
		canSave = [roles?.length, validUsername].every(Boolean) && !isLoading
	}
	if (isDelError) {
		return <Error error={delerror?.data?.message} />
	}
	if (isError) {
		return <Error error={error?.data?.message} />
	}

	return (
		<div className='flex items-center justify-center'>
			<form
				className='w-full max-w-2xl'
				onSubmit={(e) => e.preventDefault()}
			>
				<div className='flex flex-wrap mb-6'>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-md font-bold mb-2'
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
							className='block uppercase tracking-wide text-white text-md font-bold mb-2'
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
							className='block uppercase tracking-wide text-white text-md font-bold mb-2'
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

				<div className='flex flex-wrap mb-6 items-center space-x-5'>
					<div className='w-3/4 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-md font-bold mb-2'
							htmlFor='grid-state'
						>
							Select User Role
						</label>
						<div className='relative'>
							<select
								className=' block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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

					<div className='px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-md font-bold mb-2'
							htmlFor='grid-state'
						>
							ACTIVE
						</label>
						<div className='relative'>
							<input
								className='h-16 w-16'
								id='user-active'
								name='user-active'
								type='checkbox'
								checked={active}
								onChange={onActiveChanged}
							/>
						</div>
					</div>
				</div>

				<div className='flex flex-wrap'>
					<div className='w-full px-3 flex justify-between'>
						<button
							className='bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60 disabled:cursor-not-allowed'
							type='submit'
							disabled={!canSave}
							onClick={onSaveUserClicked}
						>
							Edit User
						</button>

						<button
							className='bg-red-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60 disabled:cursor-not-allowed'
							type='submit'
							disabled={!canSave}
							onClick={onDeleteUserClicked}
						>
							Delete User
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default EditUserForm
