import React from 'react'
import Notes from '../components/Notes'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import notes from '../config/notes'

const Landing = () => {
	return (
		<section className='bg-black dark:bg-black sm:h-screen min-h-screen'>
			<div className='gap-16 items-end  py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 flex-col-reverse'>
				<div className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
					<h1 className='mb-4 font-extrabold tracking-tight leading-none text-gray-900 text-8xl dark:text-white'>
						<span className='text-[#f7b801]'>Notes</span> for the
						tech <span className='text-[#f7b801]'>issue</span>
					</h1>
					<p className='mb-4 mt-10'>
						A sticky note system has been developed where users can
						create, view, edit, and delete notes. Additionally,
						there is an employee login system to access the notes
						app.
					</p>
					<p className='mb-10'>
						Only Managers or Admins have the authority to delete
						notes, whereas anyone can create a note, for instance,
						when a customer checks in.
					</p>
					<Link to='/login'>
						<Button text='Employee Login' type='button' />
					</Link>
				</div>
				<div className='sm:grid grid-cols-3 lg:grid-cols-3 gap-4 mt-8 hidden'>
					{notes.map((note) => (
						<Notes
							key={note.id}
							background={note.background}
							marginTop={note.marginTop}
							issue={note.issue}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default Landing
