import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = ({ error }) => {
	return (
		<div className='flex items-center justify-center mt-60 text-center'>
			<div role='alert' className='w-full h-20 lg:w-1/2 m-auto'>
				<div className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
					You have an error!
				</div>
				<div className='border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700'>
					<p>{error}</p>
					<Link to='/login'>
						<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5'>
							Login
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFound
