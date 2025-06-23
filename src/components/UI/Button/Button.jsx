import React from 'react'
import './Button.css'

const Button = ({ children, className, onClick }) => {
	return (
		<button
			className={`btn-gradient text-white rounded-[12px] py-[20px] px-[20px] ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button
