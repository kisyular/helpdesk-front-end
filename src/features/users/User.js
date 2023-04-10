import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

const User = ({ userId }) => {
	const { user } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			user: data?.entities[userId],
		}),
	})

	const navigate = useNavigate()
	if (!user) return null

	const handleEditUser = () => {
		navigate(`/dash/users/${userId}`)
	}

	const borderColor = user.active
		? 'dark:border-neutral-600'
		: 'dark:border-black'

	const userRolesString = user.roles.toString().replace(/,/g, ', ')
	const userActiveString = user.active ? 'Active' : 'Inactive'

	return (
		<div
			className={`block rounded-lg bg-white text-center shadow-lg w-full  ${
				user.active ? 'dark:bg-gray-800' : 'dark:bg-neutral-600'
			}`}
		>
			<div
				className={`border-b-2 py-3 dark:border-neutral-600 
				dark:text-neutral-50 
				text-xl font-bold w-full
				${borderColor}
			`}
			>
				{userRolesString}
			</div>
			<div className='flex flex-row items-center pt-2 px-2 w-full'>
				<img
					className='w-16 h-16 mb-3 rounded-full bg-black border-4 border-white dark:border-white'
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
					<p className='text-xs'>
						joined on {moment(user.createdAt).format('LLLL')}
					</p>
				</div>
			</div>

			<div
				className={`border-t-2 px-6 py-3 dark:text-neutral-50 flex justify-between ${borderColor}`}
			>
				<p
					className={`text-md text-center font-bold rounded-lg ${
						user.active ? 'text-green-500' : 'text-red-400'
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

const memoizedUser = memo(User)

export default memoizedUser
