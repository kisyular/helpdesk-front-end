import { useState, useEffect } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { Error } from '../../components/Status'

const EditNoteForm = ({ note, users }) => {
	const [updateNote, { isLoading, isSuccess, isError, error }] =
		useUpdateNoteMutation()

	const [
		deleteNote,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delerror },
	] = useDeleteNoteMutation()

	const navigate = useNavigate()

	const [title, setTitle] = useState(note.title)
	const [text, setText] = useState(note.text)
	const [completed, setCompleted] = useState(note.completed)
	const [userId, setUserId] = useState(note.user)

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setTitle('')
			setText('')
			setUserId('')
			navigate('/dash/notes')
		}
	}, [isSuccess, isDelSuccess, navigate])

	const canSave = [title, text, userId].every(Boolean) && !isLoading

	const onSaveNoteClicked = async (e) => {
		if (canSave) {
			await updateNote({
				id: note.id,
				user: userId,
				title,
				text,
				completed,
			})
		}
	}

	const onDeleteNoteClicked = async () => {
		await deleteNote({ id: note.id })
	}

	const options = users.map((user) => {
		return (
			<option
				key={user.id}
				value={user.id}
				className='h-8 w-full my-2 text-lg font-bold'
			>
				{user.username}
			</option>
		)
	})

	if (isDelError) {
		return <Error error={delerror?.data?.message} />
	}
	if (isError) {
		return <Error error={error?.data?.message} />
	}

	return (
		<div className='flex items-center justify-center mt-10'>
			<form
				className='w-full max-w-2xl'
				onSubmit={(e) => e.preventDefault()}
			>
				<div className='flex flex-wrap mb-6'>
					<div className='w-full  px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-md font-bold mb-2'
							htmlFor='title'
						>
							Note Title
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3 px-4'
							id='title'
							type='text'
							placeholder='Note Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
				</div>
				<div className='flex flex-wrap mb-6'>
					<div className='w-full px-3'>
						<label
							htmlFor='noteText'
							className='block uppercase tracking-wide text-white text-md font-bold mb-2'
						>
							Note Description
						</label>
						<textarea
							id='noteText'
							rows='8'
							className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-4'
							placeholder='Write your thoughts about the note here...'
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
					</div>
				</div>

				<div className='flex flex-wrap mb-6 items-center space-x-5'>
					<div className='w-3/4 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-md font-bold mb-2'
							htmlFor='grid-state'
						>
							Select Note User
						</label>
						<div className='relative'>
							<select
								className='block appearance-none w-full text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-2 px-4'
								id='grid-state'
								size={4}
								value={userId}
								onChange={(e) => setUserId(e.target.value)}
							>
								{options}
							</select>
						</div>
					</div>
					<div className='px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-md font-bold mb-2'
							htmlFor='grid-state'
						>
							Completed
						</label>
						<div className='relative'>
							<input
								className='h-16 w-16'
								id='user-active'
								name='user-active'
								type='checkbox'
								checked={completed}
								onChange={(e) => setCompleted(e.target.checked)}
							/>
						</div>
					</div>
				</div>

				<div className='flex flex-wrap'>
					<div className='w-full px-3 flex justify-between'>
						<button
							className='bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60 disabled:cursor-not-allowed'
							type='submit'
							disabled={!canSave}
							onClick={onSaveNoteClicked}
						>
							Save Note
						</button>

						<button
							className='bg-red-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60 disabled:cursor-not-allowed'
							type='submit'
							disabled={!canSave}
							onClick={onDeleteNoteClicked}
						>
							Delete Note
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default EditNoteForm
