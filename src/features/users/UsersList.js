import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import Button from '../../components/Button'

// Statuses: idle, loading, failed, succeeded
import { Loading, SimpleErrorMessage } from '../../components/Status'
import { Link } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'

const UsersList = () => {
	useTitle('Help Desk Users')
	const {
		data: users,
		error,
		isLoading,
		isError,
		isSuccess,
	} = useGetUsersQuery('usersList', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	})

	let content

	if (isLoading) content = <Loading />
	if (isError)
		content = (
			<SimpleErrorMessage
				errorMessage={error?.data?.message}
				errorHead='You have an error'
			/>
		)

	if (isSuccess) {
		const { ids } = users
		const userContent =
			ids?.length &&
			ids.map((userId) => <User key={userId} userId={userId} />)

		content = (
			<div className='justify-center flex items-center flex-col mt-10'>
				<Link to='/dash/users/new'>
					<Button text='Add New User' />
				</Link>
				<div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl py-4 sm:py-8 lg:py-12 justify-items-stretch px-3'>
					{userContent}
				</div>
			</div>
		)
	}

	return content
}

export default UsersList
