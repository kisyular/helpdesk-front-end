import { Link } from 'react-router-dom'
import Button from '../../components/Button'
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
							<Link to='users'>
								<Button text={'View Users'} />
							</Link>
							<Link to='notes'>
								<Button
									text={'View Notes →'}
									backgroundColor={
										'bg-[#ff006e] hover:bg-[#ff556e]'
									}
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
