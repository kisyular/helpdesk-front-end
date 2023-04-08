import React from 'react'

const UserFormName = ({
	name,
	setName,
	username,
	setUsername,
	validUsername,
}) => {
	return (
		<div className='flex flex-wrap mb-6'>
			<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
				<label
					className='block uppercase tracking-wide text-white text-md font-bold mb-2'
					htmlFor='name'
				>
					Full Name
				</label>
				<input
					className='appearance-none block w-full bg-gray-200 text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3 px-4'
					id='name'
					type='text'
					placeholder='Jane Doe'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className='w-full md:w-1/2 px-3'>
				<label
					className='block uppercase tracking-wide text-white text-md font-bold mb-2'
					htmlFor='username'
				>
					Username
				</label>
				<input
					className='appearance-none block w-full bg-gray-200 text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3 px-4'
					id='username'
					type='text'
					placeholder='janedoe'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				{!validUsername && (
					<p className='text-red-600 text-xs italic'>
						Username must be 3-20 characters long and should NOT
						contain special characters, spaces or numbers.
					</p>
				)}
			</div>
		</div>
	)
}

export default UserFormName
