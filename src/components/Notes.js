import React from 'react'

const Notes = ({ background, marginTop, issue }) => {
	return (
		<div
			className='w-full h-36 lg:h-56 rounded-lg items-center text-center pt-5'
			style={{
				background: background,
				marginTop: marginTop,
			}}
		>
			<p className='text-lg lg:text-2xl font-bold'>{issue}</p>
		</div>
	)
}

export default Notes
