import React from 'react'
import { useGetUsersQuery } from './userApiSlice'

const UsersList = () => {
	const {
		data: users,
		error,
		isLoading,
		isError,
		isSuccess,
	} = useGetUsersQuery()
	return <h1 className='text-3xl'>UsersList</h1>
}

export default UsersList
