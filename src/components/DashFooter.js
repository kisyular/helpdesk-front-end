import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'

const DashFooter = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const onGoHomeClicked = () => navigate('/dash')

	let goHomeButton = null
	if (pathname !== '/dash') {
		goHomeButton = (
			<button
				className='bg-[#f7b801] hover:bg-[#e4d197] text-black font-bold py-3 px-6 rounded-lg mr-5'
				title='Home'
				onClick={onGoHomeClicked}
			>
				<FontAwesomeIcon icon={faHouse} />
			</button>
		)
	}

	const content = (
		<footer className='w-full justify-center items-center flex pt-10 pb-10 bg-black text-white'>
			{goHomeButton}
			<p>Current User:</p>
			<p>Status: Hello</p>
		</footer>
	)
	return content
}
export default DashFooter
