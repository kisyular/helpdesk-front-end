import React from 'react'

const Button = ({ text, type, isFull, backgroundColor }) => {
	return (
		<button
			type={type}
			className={`text-black  font-bold py-3 px-6 rounded-lg ${
				isFull ? 'w-full' : ''
			} ${
				backgroundColor
					? backgroundColor
					: 'bg-[#f7b801] hover:bg-[#e4d197]'
			}  `}
		>
			{text}
		</button>
	)
}

export default Button
