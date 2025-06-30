import React from 'react'
import './Button.css'

const Button = ({ children, className, onClick, disabled = false }) => {
	const handleClick = e => {
		if (disabled) return
		if (onClick) onClick(e)
	}

	return (
		<button
			className={`btn-gradient text-white rounded-[12px] py-[20px] px-[20px] ${
				disabled ? 'btn-disabled' : ''
			} ${className || ''}`}
			onClick={handleClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button
