import { Link } from 'react-router-dom'
export default function Welcome() {
	return (
		<div className='bg-black text-white'>
			<div className='relative isolate px-6 pt-2 lg:px-8'>
				<div className='mx-auto max-w-2xl py-4 sm:py-8 lg:py-12'>
					<div className='text-center'>
						<h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
							<span className='text-[#f7b801]'>Notes</span> to
							enrich your tech{' '}
							<span className='text-[#f7b801]'>operations</span>
						</h1>
						<p className='mt-6 text-lg leading-8 text-white'>
							Anim aute id magna aliqua ad ad non deserunt sunt.
							Qui irure qui lorem cupidatat commodo. Elit sunt
							amet fugiat veniam occaecat fugiat aliqua.
						</p>
						<div className='mt-10 flex items-center justify-center gap-x-6'>
							<Link
								to='#'
								className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								Get started
							</Link>
							<Link
								to='#'
								className='text-sm font-semibold leading-6 text-white'
							>
								Learn more <span aria-hidden='true'>→</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
