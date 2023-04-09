import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import { Loading } from '../../components/Status'
import { useGetUsersQuery } from './usersApiSlice'

const EditUser = () => {
	const { id } = useParams()

	const { user } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			user: data?.entities[id],
		}),
	})

	// If no user, return Loading State
	if (!user) return <Loading />

	return <EditUserForm user={user} />
}
export default EditUser
