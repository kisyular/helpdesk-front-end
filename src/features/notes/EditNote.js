import { useParams } from 'react-router-dom'
import EditNoteForm from './EditNoteForm'
import { Loading } from '../../components/Status'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import SimpleErrorMessage from '../../components/Status/SimpleErrorMessage'

const EditNote = () => {
	const { id } = useParams()

	const { username, isManager, isAdmin } = useAuth()

	const { note } = useGetNotesQuery('notesList', {
		selectFromResult: ({ data }) => ({
			note: data?.entities[id],
		}),
	})

	const { users } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map((id) => data?.entities[id]),
		}),
	})

	if (!note || !users?.length) return <Loading />

	if (!isManager && !isAdmin) {
		if (note.username !== username) {
			return (
				<div className='mt-60 px-3'>
					<SimpleErrorMessage
						errorMessage="You don't have access to edit this note"
						errorHead='No Access'
					/>
				</div>
			)
		}
	}

	const content = <EditNoteForm note={note} users={users} />

	return content
}
export default EditNote
