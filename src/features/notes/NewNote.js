import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'
import { Loading } from '../../components/Status'

const NewNote = () => {
	const users = useSelector(selectAllUsers)

	const content = users ? <NewNoteForm users={users} /> : <Loading />

	return content
}
export default NewNote
