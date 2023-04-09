import React from 'react'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'

const CallToActions = ({ operation }) => {
	return (
		<div>
			<h1 className='text-4xl font-bold tracking-tight mt-10'>
				Manage {operation}s
			</h1>
			<div className='mt-1 flex items-center justify-center gap-x-6'>
				<Link to={`${operation}s`}>
					<Button text={`view ${operation}s`} />
				</Link>
				<Link to={`${operation}s/new`}>
					<Button
						text={`add new ${operation}`}
						backgroundColor={'bg-[#ff006e] hover:bg-[#ff556e]'}
					/>
				</Link>
			</div>
		</div>
	)
}

export default CallToActions
