import The404 from '../../images/404.gif'

const NotFound404 = () => {
	return (
		<div className='flex justify-center items-center h-screen flex-col'>
			<p className='text-red-600 font-extrabold text-6xl'>Not Found</p>
			<img src={The404} alt='loading' />
		</div>
	)
}

export default NotFound404
