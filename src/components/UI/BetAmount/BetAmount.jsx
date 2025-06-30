import { useState } from 'react'
import computingIcon from '../../../assets/icon/computing.svg'
import Button from '../Button/Button'

const BetAmount = ({
	initialValue = 0.1,
	onChange,
	onBet,
	disabled = false,
}) => {
	const [amount, setAmount] = useState(initialValue)

	const handleDecrease = () => {
		if (disabled) return
		const newAmount = Math.max(0.1, parseFloat((amount - 0.1).toFixed(2)))
		setAmount(newAmount)
		if (onChange) onChange(newAmount)
	}

	const handleIncrease = () => {
		if (disabled) return
		const newAmount = parseFloat((amount + 0.1).toFixed(2))
		setAmount(newAmount)
		if (onChange) onChange(newAmount)
	}

	const handleBet = () => {
		if (disabled) return
		if (onBet) onBet(amount)
	}

	return (
		<div className='flex flex-col gap-[25px]'>
			<div className='flex items-center gap-[6px]'>
				<img src={computingIcon} alt='' />
				<h3 className='text-white text-[21px] font-medium'>Bet amount</h3>
			</div>

			<div className='flex items-center bg-[rgba(25,27,49,0.4)] h-[80px] p-[11px] border border-[#2B2F53] rounded-[12px] overflow-hidden'>
				<button
					className={`bg-[#101325] border-[1px] border-[#2B2F53] rounded-[12px] text-white text-2xl w-[57px] h-[57px] flex items-center justify-center cursor-pointer transition-colors ${
						disabled ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					onClick={handleDecrease}
					disabled={disabled}
				>
					<svg
						width={19}
						height={5}
						viewBox='0 0 19 5'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M11.4503 4.84278H7.56764H0V0.916718H7.56764H11.4503H19V4.84278H11.4503Z'
							fill='white'
						/>
					</svg>
				</button>
				<div className='flex-1 text-center text-white text-[24px] font-semibold'>
					{amount}
				</div>
				<button
					className={`bg-[#101325] border-[1px] border-[#2B2F53] rounded-[12px] text-white text-2xl w-[57px] h-[57px] flex items-center justify-center cursor-pointer transition-colors ${
						disabled ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					onClick={handleIncrease}
					disabled={disabled}
				>
					<svg
						width={19}
						height={19}
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M11.4503 11.454V19H7.56764V11.454H0V7.52796H7.56764V0H11.4503V7.52796H19V11.454H11.4503Z'
							fill='white'
						/>
					</svg>
				</button>
			</div>

			<Button
				className={`flex items-center justify-center gap-[12px] py-[28px] ${
					disabled ? 'opacity-50 cursor-not-allowed' : ''
				}`}
				onClick={handleBet}
				disabled={disabled}
			>
				<span>
					<svg
						width={24}
						height={24}
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M16.42 7.95C18.86 10.39 18.86 14.35 16.42 16.79C13.98 19.23 10.02 19.23 7.58 16.79C5.14 14.35 5.14 10.39 7.58 7.95C10.02 5.51 13.98 5.51 16.42 7.95Z'
							fill='white'
						/>
						<path
							d='M8.25003 22.39C8.16003 22.39 8.06003 22.37 7.97003 22.34C5.72003 21.44 3.90003 19.85 2.68003 17.75C1.50003 15.7 1.03003 13.38 1.34003 11.02C1.39003 10.61 1.78003 10.32 2.18003 10.37C2.59003 10.42 2.88003 10.8 2.83003 11.21C2.57003 13.24 2.97003 15.24 3.98003 17C5.02003 18.8 6.59003 20.17 8.52003 20.94C8.90003 21.1 9.09003 21.53 8.94003 21.92C8.83003 22.21 8.54003 22.39 8.25003 22.39Z'
							fill='white'
						/>
						<path
							d='M5.84998 5.22999C5.62998 5.22999 5.40998 5.12999 5.25998 4.93999C4.99998 4.61999 5.05998 4.14999 5.38998 3.88999C7.28998 2.39999 9.57998 1.60999 12 1.60999C14.36 1.60999 16.61 2.36999 18.5 3.80999C18.83 4.05999 18.89 4.52999 18.64 4.85999C18.39 5.18999 17.92 5.24999 17.59 4.99999C15.96 3.75999 14.03 3.10999 12 3.10999C9.91998 3.10999 7.94998 3.78999 6.30998 5.06999C6.16998 5.17999 6.00998 5.22999 5.84998 5.22999Z'
							fill='white'
						/>
						<path
							d='M15.75 22.39C15.45 22.39 15.17 22.21 15.05 21.92C14.9 21.54 15.08 21.1 15.47 20.94C17.4 20.16 18.97 18.8 20.01 17C21.03 15.24 21.43 13.24 21.16 11.22C21.11 10.81 21.4 10.43 21.81 10.38C22.21 10.33 22.6 10.62 22.65 11.03C22.95 13.38 22.49 15.71 21.31 17.76C20.1 19.86 18.27 21.44 16.02 22.35C15.94 22.37 15.85 22.39 15.75 22.39Z'
							fill='white'
						/>
					</svg>
				</span>
				{disabled ? 'SPINNING...' : 'BET'}
			</Button>
		</div>
	)
}

export default BetAmount
