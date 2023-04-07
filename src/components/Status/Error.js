import React from 'react'

import errorImage from '../../images/error.gif'
const NotFound = ({ error }) => {
	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<h1 className='text-5xl text-red-500'>{error}</h1>
			<img src={errorImage} alt='loading' />
		</div>
	)
}

export default NotFound
