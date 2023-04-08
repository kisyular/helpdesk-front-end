import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'
import { Loading } from '../../components/Status'

const EditUser = () => {
	const { id } = useParams()
	const user = useSelector((state) => selectUserById(state, id))
	return <EditUserForm user={user} />
}
export default EditUser
