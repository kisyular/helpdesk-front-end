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
			<div className='flex flex-col items-center pb-10 pt-4'>
				<img
					className='w-24 h-24 mb-3 rounded-full bg-black border-4 border-white dark:border-white'
					src={`https://robohash.org/${user.username}.png`}
					alt={user.name}
				/>
				<h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
					{user.name}
				</h5>
				<span className='text-sm text-gray-500 dark:text-gray-400'>
					{user.username}
				</span>
				<div className='flex mt-4 space-x-3 md:mt-6'>
					<p
						className={`inline-flex text-md items-center px-3 py-1 text-center text-white font-bold rounded-lg ${
							user.active ? 'bg-green-500' : 'bg-red-300'
						}`}
					>
						{userActiveString}
					</p>
				</div>
			</div>

			<div className='border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50'>
				<Link
					onClick={handleEditUser}
					to={`${userId}`}
					className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-white border border-blue-300 rounded-lg hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:focus:ring-blue-700'
				>
					Edit User
				</Link>
			</div>
		</div>
	)
}

export default User
