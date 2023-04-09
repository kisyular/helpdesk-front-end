import useAuth from '../../hooks/useAuth'
import CallToActions from './CallToActions'

export default function Welcome() {
	const { name, isAdmin, isManager } = useAuth()
	return (
		<div className='bg-black text-white'>
			<div className='relative isolate px-6 pt-2 lg:px-8'>
				<div className='mx-auto max-w-2xl py-4 sm:py-8 lg:py-12'>
					<div className='text-center'>
						<h1 className='text-4xl font-bold tracking-tight text-[#ff006e] sm:text-6xl mb-12'>
							Welcome <br />
							{name}
						</h1>
						<h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
							<span className='text-[#f7b801]'>
								notes tracker
							</span>{' '}
							that enrich your tech{' '}
							<span className='text-[#f7b801]'>operations</span>
						</h1>
						<p className='mt-6 text-lg leading-8 text-white'>
							Anim aute id magna aliqua ad ad non deserunt sunt.
							Qui irure qui lorem cupidatat commodo. Elit sunt
							amet fugiat veniam occaecat fugiat aliqua.
						</p>

						{(isAdmin || isManager) && (
							<CallToActions operation={'user'} />
						)}
						<CallToActions operation={'note'} />
					</div>
				</div>
			</div>
		</div>
	)
}
