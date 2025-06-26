import React from 'react'

const NavigationView = ({ activeSection, onNavigate }) => {
	return (
		<div className='flex justify-between border-b border-[#1F233C] px-5'>
			<button
				className={`py-3 px-2 relative flex-1 text-sm font-medium ${
					activeSection === 'profile' ? 'text-white' : 'text-[#8A99BD]'
				}`}
				onClick={() => onNavigate('profile')}
			>
				Profile
				{activeSection === 'profile' && (
					<span className='absolute bottom-0 left-0 w-full h-0.5 bg-[#2F80ED]'></span>
				)}
			</button>
			<button
				className={`py-3 px-2 relative flex-1 text-sm font-medium ${
					activeSection === 'history' ? 'text-white' : 'text-[#8A99BD]'
				}`}
				onClick={() => onNavigate('history')}
			>
				History
				{activeSection === 'history' && (
					<span className='absolute bottom-0 left-0 w-full h-0.5 bg-[#2F80ED]'></span>
				)}
			</button>
			<button
				className={`py-3 px-2 relative flex-1 text-sm font-medium ${
					activeSection === 'withdraw' ? 'text-white' : 'text-[#8A99BD]'
				}`}
				onClick={() => onNavigate('withdraw')}
			>
				Withdraw
				{activeSection === 'withdraw' && (
					<span className='absolute bottom-0 left-0 w-full h-0.5 bg-[#2F80ED]'></span>
				)}
			</button>
			<button
				className={`py-3 px-2 relative flex-1 text-sm font-medium ${
					activeSection === 'deposit' ? 'text-white' : 'text-[#8A99BD]'
				}`}
				onClick={() => onNavigate('deposit')}
			>
				Deposit
				{activeSection === 'deposit' && (
					<span className='absolute bottom-0 left-0 w-full h-0.5 bg-[#2F80ED]'></span>
				)}
			</button>
		</div>
	)
}

export default NavigationView
