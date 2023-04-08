import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const User = ({ userId }) => {
	const navigate = useNavigate()
	const user = useSelector((state) => selectUserById(state, userId))

	if (!user) return null

	const handleEditUser = () => {
		navigate(`/dash/users/${userId}`)
	}

	const userRolesString = user.roles.toString().replace(/,/g, ', ')
	const userActiveString = user.active ? 'Active' : 'Inactive'

	return (
		<div className='block rounded-lg bg-white text-center shadow-lg dark:bg-neutral-700'>
			<div className='border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 text-xl font-bold'>
				{userRolesString}
			</div>
			<div className='flex flex-row items-center pt-2 px-2'>
				<img
					className='w-20 h-20 mb-3 rounded-full bg-black border-4 border-white dark:border-white'
					src={`https://robohash.org/${user.username}.png`}
					alt={user.name}
				/>
				<div className='flex flex-col items-start ml-4'>
					<p className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
						{user.name}
					</p>
					<Link
						to={userId}
						className='text-sm text-blue-500 dark:text-blue-300'
					>
						@{user.username}
					</Link>
				</div>
			</div>

			<div className='border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 flex justify-between'>
				<p
					className={`text-md text-center font-bold rounded-lg ${
						user.active ? 'text-green-500' : 'text-red-300'
					}`}
				>
					{userActiveString}
				</p>
				<Link
					onClick={handleEditUser}
					to={`${userId}`}
					className='text-md text-center font-bold rounded-lg text-blue-300 '
				>
					Edit User
				</Link>
			</div>
		</div>
	)
}

export default User
