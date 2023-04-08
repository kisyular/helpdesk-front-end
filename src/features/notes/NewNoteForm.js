import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewNoteMutation } from './notesApiSlice'
import { Error } from '../../components/Status'

const NewNoteForm = ({ users }) => {
	const [addNewNote, { isLoading, isSuccess, isError, error }] =
		useAddNewNoteMutation()

	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [userId, setUserId] = useState(users[0].id)

	useEffect(() => {
		if (isSuccess) {
			setTitle('')
			setText('')
			setUserId('')
			navigate('/dash/notes')
		}
	}, [isSuccess, navigate])

	const canSave = [title, text, userId].every(Boolean) && !isLoading

	const onSaveNoteClicked = async (e) => {
		e.preventDefault()
		if (canSave) {
			await addNewNote({ user: userId, title, text })
		}
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

	if (isError) {
		return <Error error={error?.data?.message} />
	}

	return (
		<div className='flex items-center justify-center'>
			<form className='w-full max-w-2xl' onSubmit={onSaveNoteClicked}>
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
							rows='4'
							className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-4'
							placeholder='Write your thoughts about the note here...'
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
					</div>
				</div>

				<div className='flex flex-wrap mb-6'>
					<div className='w-full px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-md font-bold mb-2'
							htmlFor='grid-state'
						>
							Select Note Role
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
				</div>

				<div className='flex flex-wrap'>
					<div className='w-full px-3'>
						<button
							className='bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60 disabled:cursor-not-allowed'
							type='submit'
							disabled={!canSave}
						>
							Add Note
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default NewNoteForm
