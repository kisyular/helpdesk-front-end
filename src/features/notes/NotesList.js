import React from 'react'
import { useGetNotesQuery } from './notesApiSlice'
import Note from './Note'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

// Statuses: idle, loading, failed, succeeded
import { Loading, Error } from '../../components/Status'

const NotesList = () => {
	const {
		data: notes,
		error,
		isLoading,
		isError,
		isSuccess,
	} = useGetNotesQuery(undefined, {
		refetchOnMountOrArgChange: true,
		pullToRefresh: true,
		pullingInterval: 15000,
		refetchOnFocus: true,
	})

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
