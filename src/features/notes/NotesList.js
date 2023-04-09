import { Link } from 'react-router-dom'

import { useGetNotesQuery } from './notesApiSlice'
import Note from './Note'
import Button from '../../components/Button'
// Statuses: idle, loading, failed, succeeded
import { Loading, Error } from '../../components/Status'
import useAuth from '../../hooks/useAuth'

const NotesList = () => {
	const {
		data: notes,
		error,
		isLoading,
		isError,
		isSuccess,
	} = useGetNotesQuery('notesList', {
		pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
		refetchOnReconnect: true,
	})

	const { username, isManager, isAdmin } = useAuth()

	let content

	if (isLoading) content = <Loading />
	if (isError) content = <Error error={error?.data?.message} />

	if (isSuccess) {
		const { ids, entities } = notes

		let filteredIds
		if (isManager || isAdmin) {
			filteredIds = [...ids]
		} else {
			filteredIds = ids.filter(
				(noteId) => entities[noteId].username === username
			)
		}

		const noteContent =
			ids?.length &&
			filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)

		content = (
			<div className='justify-center flex items-center flex-col mt-10'>
				<Link to='/dash/notes/new'>
					<Button text='Add New Note' />
				</Link>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl py-4 sm:py-8 lg:py-12 justify-items-stretch px-2'>
					{noteContent}
				</div>
			</div>
		)
	}

	return content
}

export default NotesList
