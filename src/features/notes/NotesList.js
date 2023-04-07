import React from 'react'
import { useGetNotesQuery } from './notesApiSlice'
import Note from './Note'

// Statuses: idle, loading, failed, succeeded
import { Loading, Error } from '../../components/Status'

const NotesList = () => {
	const {
		data: notes,
		error,
		isLoading,
		isError,
		isSuccess,
	} = useGetNotesQuery()

	let content

	if (isLoading) content = <Loading />
	if (isError) content = <Error error={error?.data?.message} />

	if (isSuccess) {
		const { ids } = notes
		const noteContent = ids?.length ? (
			ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
		) : (
			<p>No notes found</p>
		)

		content = (
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl py-4 sm:py-8 lg:py-12 justify-items-stretch px-2'>
				{noteContent}
			</div>
		)
	}

	return content
}

export default NotesList
