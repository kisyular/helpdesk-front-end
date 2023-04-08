import React from 'react'

const FormSelect = ({ options, roles, onRolesChanged, label }) => {
	return (
		<div>
			<label
				className='block uppercase tracking-wide text-white text-md font-bold mb-2'
				htmlFor='grid-state'
			>
				Select {label}
			</label>
			<div className='relative'>
				<select
					className=' block appearance-none w-full text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-2 px-4'
					id='grid-state'
					multiple
					size={4}
					value={roles}
					onChange={onRolesChanged}
				>
					{options}
				</select>
			</div>
		</div>
	)
}

export default FormSelect
