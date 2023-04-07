import React from 'react'

import deleteIMG from '../../images/deleting.gif'

const Deleting = () => {
	return (
		<div className='flex justify-center items-center flex-col'>
			<img src={deleteIMG} alt='loading' className=' w-full' />
		</div>
	)
}

export default Deleting
