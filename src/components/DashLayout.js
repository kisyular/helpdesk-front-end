import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'

const DashLayout = () => {
	return (
		<>
			<DashHeader />
			{/* <Header /> */}
			<div className='bg-black text-white'>
				<Outlet />
			</div>
		</>
	)
}
export default DashLayout
