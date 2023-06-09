import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '../images/favicon.png'
import { Loading, SimpleErrorMessage } from './Status'

import { useEffect } from 'react'
import {
	useNavigate,
	Link,
	// useLocation
} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function DashHeader() {
	const navigate = useNavigate()
	// const { pathname } = useLocation()

	const { username, status, name } = useAuth()
	const navigation = [
		{ name: 'Dashboard', to: '/dash', current: true },
		{ name: 'Notes', to: 'notes', current: false },
		{ name: 'Add New Note', to: 'notes/new', current: false },
		{ name: `Hi ${name}` },
	]

	const [sendLogout, { isLoading, isSuccess, isError, error }] =
		useSendLogoutMutation()

	useEffect(() => {
		if (isSuccess) navigate('/')
	}, [isSuccess, navigate])

	if (isLoading) return <Loading />

	if (isError)
		return (
			<SimpleErrorMessage
				errorMessage={error.data?.message}
				errorHeader='Error!'
			/>
		)

	return (
		<Disclosure as='nav' className='bg-black'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>
										Open main menu
									</span>
									{open ? (
										<XMarkIcon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									) : (
										<Bars3Icon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex flex-shrink-0 items-center'>
									<Link to='/dash'>
										<img
											className='block h-8 w-auto lg:hidden'
											src={Logo}
											alt='Help Desk'
										/>
									</Link>
									<Link to='/dash'>
										<img
											className='hidden h-8 w-auto lg:block'
											src={Logo}
											alt='Help Desk'
										/>
									</Link>
								</div>
								<div className='hidden sm:ml-6 sm:block'>
									<div className='flex space-x-4'>
										{navigation.map((item) => (
											<Link
												key={item.name}
												to={item.to}
												className={classNames(
													item.current
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'rounded-md px-3 py-2 text-sm font-medium'
												)}
												aria-current={
													item.current
														? 'page'
														: undefined
												}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								<button
									type='button'
									className='rounded-full bg-[#f7b801] py-1 px-4 text-black font-bold hover:bg-[#e4d197] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#f7b801]'
								>
									{status}
								</button>

								{/* Profile dropdown */}
								<Menu as='div' className='relative ml-3'>
									<div>
										<Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
											<span className='sr-only'>
												Open user menu
											</span>
											<img
												className='h-8 w-8 rounded-full'
												src={`https://robohash.org/${username}.png`}
												alt=''
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'
									>
										<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
											<Menu.Item>
												{({ active }) => (
													<p
														to='#'
														className={classNames(
															active
																? 'bg-gray-100'
																: '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														Hi {name}
													</p>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<Link
														onClick={sendLogout}
														className={classNames(
															active
																? 'bg-gray-100'
																: '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														Sign Out
													</Link>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='space-y-1 px-2 pb-3 pt-2'>
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.to}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium'
									)}
									aria-current={
										item.current ? 'page' : undefined
									}
								>
									{item.name}
								</Link>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}
