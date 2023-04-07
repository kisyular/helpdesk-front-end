import React from 'react'

const Button = ({ text, type, isFull }) => {
	return (
		<button
			type={type}
			className={`text-black bg-[#f7b801] hover:bg-[#e4d197] font-bold py-3 px-6 rounded-lg ${
				isFull ? 'w-full' : ''
			} `}
		>
			{text}
		</button>
	)
}

export default Button
