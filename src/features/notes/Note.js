import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import momemt from 'moment'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'

const Note = ({ noteId }) => {
	const { note } = useGetNotesQuery('notesList', {
		selectFromResult: ({ data }) => ({
			note: data?.entities[noteId],
		}),
	})

	const navigate = useNavigate()
	if (!note) return null

	const handleEditNote = () => {
		navigate(`/dash/notes/${noteId}`)
	}
	const noteStatus = note.completed ? 'COMPLETED' : 'OPEN'

	return (
		<div className='bg-white dark:bg-neutral-700 shadow-lg rounded-lg flex'>
			<div className='flex flex-col justify-between items-start py-2 w-full'>
				<div className='mt-4 flex items-center justify-between w-full border-b-2 border-gray-500 pb-4 px-2'>
					<div className='flex'>
						<img
							className='w-12 h-12 rounded-full object-cover mr-2 shadow bg-gray-400 border-2 border-gray-950'
							src={`https://robohash.org/${note.username}.png`}
							alt={note.username}
						/>
						<div className='items-start'>
							<p className='text-white text-xs'>Assigned to</p>
							<Link
								className='text-sm font-semibold text-blue-300 mb-0'
								to={`/dash/users/${note.user}`}
							>
								@{note.username}
							</Link>
						</div>
					</div>
					<div className='flex flex-col justify-between'>
						<p
							className={`text-md text-center font-bold rounded-lg ${
								note.completed
									? 'text-green-500'
									: 'text-red-400'
							}`}
						>
							{noteStatus}
						</p>
						<Link
							className='flex mr-2 text-blue-300 text-sm lg:mr-4'
							to={`/dash/notes/${noteId}`}
							onClick={handleEditNote}
						>
							<svg
								fill='none'
								viewBox='0 0 24 24'
								className='w-4 h-4 mr-1'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
								/>
							</svg>
							<span className='text-blue-300'>View Note</span>
						</Link>
					</div>
				</div>

				<div className='mt-2 w-full px-2'>
					<h2 className='font-bold text-white text-xl'>
						{note.title}
					</h2>
					<p className='mt-1 text-gray-300 text-sm'>{note.text}</p>
				</div>
				<div className='mt-2 w-full px-2'>
					<div className='mt-6 w-full'>
						<table className='border-collapse border border-gray-500 w-full'>
							<thead>
								<tr>
									<th className='border-2 border-gray-500 text-start'>
										ACTION
									</th>
									<th className='border-2 border-gray-500 text-start'>
										TIME
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='border-2 border-gray-500'>
										Created
									</td>
									<td className='border-2 border-gray-500'>
										{momemt(note.createdAt).format('LLLL')}
									</td>
								</tr>
								<tr>
									<td className='border-2 border-gray-500'>
										Updated
									</td>
									<td className='border-2 border-gray-500'>
										{momemt(note.updatedAt).format('LLLL')}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

const memoizedNote = memo(Note)

export default memoizedNote
