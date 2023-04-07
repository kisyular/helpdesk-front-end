import Landing from './pages/Landing'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
// import NotesList from './features/notes/NotesList'
// import UsersList from './features/users/UsersList'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<Landing />} />
				<Route path='/login' element={<Login />} />
				<Route path='/dash' element={<DashLayout />}>
					<Route index element={<Welcome />} />
					{/* <Route path="/notes" element={<NotesList />} /> */}
					{/* <Route path="/users" element={<UsersList />} /> */}
				</Route>
			</Route>
		</Routes>
	)
}

export default App
