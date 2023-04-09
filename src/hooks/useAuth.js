import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
	const token = useSelector(selectCurrentToken)
	let isManager = false
	let isAdmin = false
	let status = 'Employee'

	if (token) {
		const decoded = jwtDecode(token)
		// console.log(decoded)
		const { username, roles, name } = decoded.UserInfo

		isManager = roles.includes('Manager')
		isAdmin = roles.includes('Admin')

		if (isManager) status = 'Manager'
		if (isAdmin) status = 'Admin'

		return { username, roles, status, isManager, isAdmin, name }
	}

	return { username: '', roles: [], isManager, isAdmin, status, name: '' }
}

export default useAuth
