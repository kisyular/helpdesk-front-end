import React from 'react'

const UserFormPassword = ({ password, setPassword, validPassword }) => {
	return (
		<div className='flex flex-wrap mb-6'>
			<div className='w-full px-3'>
				<label
					className='block uppercase tracking-wide text-white text-md font-bold mb-2'
					htmlFor='grid-password'
				>
					Password
				</label>
				<input
					className='appearance-none block w-full bg-gray-200 text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3 px-4'
					id='grid-password'
					type='password'
					placeholder='******************'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{!validPassword && (
					<p className='text-red-600 text-xs italic'>
						Password must be a minimum 4 characters long and should
						NOT contain spaces.
					</p>
				)}
			</div>
		</div>
	)
}

export default UserFormPassword
