import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import Button from '../../components/Button'

// Statuses: idle, loading, failed, succeeded
import { Loading, Error } from '../../components/Status'
import { Link } from 'react-router-dom'

const UsersList = () => {
	const {
		data: users,
		error,
		isLoading,
		isError,
		isSuccess,
	} = useGetUsersQuery(undefined, {
		refetchOnMountOrArgChange: true,
		pullToRefresh: true,
		pullingInterval: 60000,
		refetchOnFocus: true,
	})

	let content

	if (isLoading) content = <Loading />
	if (isError) content = <Error error={error?.data?.message} />

	if (isSuccess) {
		const { ids } = users
		const userContent = ids?.length ? (
			ids.map((userId) => <User key={userId} userId={userId} />)
		) : (
			<p>No users found</p>
		)

		content = (
			<div className='justify-center flex items-center flex-col mt-10'>
				<Link to='/dash/users/new'>
					<Button text='Add New User' />
				</Link>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl py-4 sm:py-8 lg:py-12 justify-items-stretch px-2'>
					{userContent}
				</div>
			</div>
		)
	}

	return content
}

export default UsersList
