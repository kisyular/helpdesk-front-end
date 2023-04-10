import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'
import { SimpleErrorMessage } from '../../components/Status'
import UserFormName from './UserFormName'
import UserFormPassword from './UserFormPassword'
import FormSelect from '../../components/FormSelect'

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
			<option
				key={role}
				value={role}
				className='h-8 w-full my-2 text-lg font-bold'
			>
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
		return (
			<SimpleErrorMessage
				errorMessage={delerror?.data?.message}
				errorHead='Error deleting the user'
			/>
		)
	}
	if (isError) {
		return (
			<SimpleErrorMessage
				errorMessage={error?.data?.message}
				errorHead='You have an error'
			/>
		)
	}

	return (
		<div className='flex items-center justify-center'>
			<form
				className='w-full max-w-2xl'
				onSubmit={(e) => e.preventDefault()}
			>
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
					<div className='w-3/4 px-3 mb-6 md:mb-0'>
						<FormSelect
							label='roles'
							options={options}
							onRolesChanged={onRolesChanged}
							value={roles}
						/>
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
							Save User
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
