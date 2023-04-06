import React from 'react'
import Notes from '../components/Notes'

const Landing = () => {
	return (
		<section className='bg-black dark:bg-black '>
			<div className='gap-16 items-end  py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'>
				<div className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
					<h1 className='mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-8xl dark:text-white'>
						<span className='text-yellow-600'>Notes</span> for the
						tech <span className='text-yellow-600'>issue</span>
					</h1>
					<p className='mb-4 mt-10'>
						We are strategists, designers and developers. Innovators
						and problem solvers. Small enough to be simple and
						quick, but big enough to deliver the scope you want at
						the pace you need. Small enough to be simple and quick,
						but big enough to deliver the scope you want at the pace
						you need.
					</p>
					<p>
						We are strategists, designers and developers. Innovators
						and problem solvers. Small enough to be simple and
						quick.
					</p>
				</div>
				<div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
					<Notes
						background='#faedcd'
						marginTop={40}
						issue={'How do I reset my password?'}
					/>
					<Notes
						background='#e76f51'
						issue={'How do I update my software?'}
					/>
					<Notes
						background='#2a9d8f'
						marginTop={40}
						issue={'Why is my printer not working?'}
					/>
					<Notes
						background='#ff006e'
						issue={'How do I remove a virus from my computer?'}
					/>
					<Notes
						background='#4895ef'
						marginTop={40}
						issue={
							'How do I transfer files from one device to another?'
						}
					/>
					<Notes
						background='#e9c46a'
						issue={'How do I remove a virus from my computer?'}
					/>
				</div>
			</div>
		</section>
	)
}

export default Landing
