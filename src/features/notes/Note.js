import React from 'react'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import momemt from 'moment'

const Note = ({ noteId }) => {
	const navigate = useNavigate()
	const note = useSelector((state) => selectNoteById(state, noteId))

	if (!note) return null

	const handleEditNote = () => {
		navigate(`/dash/notes/${noteId}`)
	}

	return (
		<div className='bg-white shadow-lg rounded-lg'>
			<div className='flex flex-col items-start px-4 py-2'>
				<div className='mt-4 flex items-center justify-between w-full'>
					<div className='flex'>
						<img
							className='w-12 h-12 rounded-full object-cover mr-2 shadow bg-gray-400 border-2 border-gray-950'
							src={`https://robohash.org/${note.username}.png`}
							alt={note.username}
						/>
						<div className='items-start'>
							<p className='text-gray-700 text-xs'>Assigned to</p>
							<Link
								className='text-sm font-semibold text-blue-700 mb-0'
								to={`/dash/users/${note.user}`}
							>
								@{note.username}
							</Link>
							<p className='text-gray-700 text-xs'>
								on{' '}
								{momemt(note.createdAt).format('MMMM Do YYYY')}
							</p>
						</div>
					</div>
					{note.completed ? (
						<p
							className={`inline-flex text-md items-center px-3 py-1 text-center text-white font-bold rounded-lg bg-green-500`}
						>
							COMPLETED
						</p>
					) : (
						<p
							className={`inline-flex text-md items-center px-3 py-1 text-center text-white font-bold rounded-lg bg-red-300`}
						>
							OPEN
						</p>
					)}
				</div>

				<div className='mt-2'>
					<h2 className='font-bold text-black '>{note.title}</h2>
					<p className='mt-1 text-gray-800 text-sm'>{note.text}</p>
					<div className='mt-4 flex items-end justify-between'>
						<div className='flex flex-col justify-between mt-1 mb-1'>
							<small className='text-xs text-purple-700'>
								created {momemt(note.createdAt).fromNow()}
							</small>
							<small className='text-xs text-gray-700'>
								updated {momemt(note.updatedAt).fromNow()}
							</small>
						</div>
						<Link
							className='flex mr-2 text-blue-700 text-sm lg:mr-4'
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
							<span className='text-blue-700'>View Post</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Note
