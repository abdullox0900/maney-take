import React from 'react'
import './Button.css'

const Button = ({ children, className }) => {
	return (
		<button
			className={`btn-gradient text-white rounded-[12px] py-[20px] px-[20px] ${className}`}
		>
			{children}
		</button>
	)
}

export default Button
