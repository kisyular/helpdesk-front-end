import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
// import Header from './Header'

const DashLayout = () => {
	return (
		<>
			<DashHeader />
			{/* <Header /> */}
			<div className='bg-black text-white'>
				<Outlet />
			</div>
			<DashFooter />
		</>
	)
}
export default DashLayout
