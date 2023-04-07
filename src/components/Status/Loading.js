import React from 'react'

import loading from '../../images/loading.gif'
const Loading = () => {
	return (
		<div className='flex justify-center items-center h-screen'>
			<img src={loading} alt='loading' />
		</div>
	)
}

export default Loading
