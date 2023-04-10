import { useGetUsersQuery } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'
import { Loading } from '../../components/Status'

const NewNote = () => {
	const { users } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map((id) => data?.entities[id]),
		}),
	})

	if (!users?.length) {
		return (
			<Loading />
			// <div className='flex items-center justify-center mt-60 text-center'>
			// 	<div
			// 		className='bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 rounded-lg'
			// 		role='alert'
			// 	>
			// 		<p className='font-bold'>Oh no. We hit a snag</p>
			// 		<p className='text-sm'>
			// 			This site needs data which is not currently available.
			// 			Please try again later.
			// 		</p>
			// 	</div>
			// </div>
		)
	}

	const content = <NewNoteForm users={users} />

	return content
}
export default NewNote
