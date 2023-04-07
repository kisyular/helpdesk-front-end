import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'

// Statuses: idle, loading, failed, succeeded
import { Loading, Error } from '../../components/Status'

const UsersList = () => {
	const {
		data: users,
		error,
		isLoading,
		isError,
		isSuccess,
	} = useGetUsersQuery()

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
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-6xl py-4 sm:py-8 lg:py-12 justify-items-stretch px-2'>
				{userContent}
			</div>
		)
	}

	return content
}

export default UsersList
