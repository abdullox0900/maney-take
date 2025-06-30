import React from 'react'
import { useNavigate } from 'react-router-dom'
import tonIcon from '../../../assets/icon/ton-icon.svg'
import logo from '../../../assets/profile-logo.svg'
import MainBox from '../../../components/MainBox/MainBox'
import Button from '../../../components/UI/Button/Button'
import './style.css'

const ProfileView = ({ walletAddress, isConnecting, onConnectWallet }) => {
	const navigate = useNavigate()

	return (
		<MainBox>
			<div className='flex flex-col items-center'>
				<div className='w-[100px] h-[100px] rounded-full bg-[#181C30] flex items-center justify-center border border-[#272D4D] mb-[20px]'>
					<img src={logo} alt='Profile' className='w-[60px] h-[60px]' />
				</div>
				<h2 className='text-white text-[18px] font-medium mb-[25px]'>
					Name Profile
				</h2>

				<div className='w-full flex justify-between items-center mb-[12px] py-[11px] pl-[20px] pr-[16px] bg-[rgba(28,31,51,0.5)] rounded-[12px] border border-[#1F233C]'>
					<div className='flex items-center gap-[6px]'>
						<img src={tonIcon} alt='TON' className='w-[20px] h-[20px]' />
						<span className='text-white text-[18px] font-bold'>150 TON</span>
					</div>
					<button
						className='flex items-center gap-[12px] bg-[#131628] border border-[#1F233C] rounded-[10px] p-[12px] text-white text-[18px]'
						onClick={() => navigate('/profile/withdraw')}
					>
						<svg
							width={24}
							height={24}
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.25 12.33C17.25 12.74 16.91 13.08 16.5 13.08C16.09 13.08 15.75 12.74 15.75 12.33V9.31L8.03 17.03C7.88 17.18 7.69 17.25 7.5 17.25C7.31 17.25 7.12 17.18 6.97 17.03C6.68 16.74 6.68 16.26 6.97 15.97L14.69 8.25H11.67C11.26 8.25 10.92 7.91 10.92 7.5C10.92 7.09 11.26 6.75 11.67 6.75H16.5C16.91 6.75 17.25 7.09 17.25 7.5V12.33Z'
								fill='white'
							/>
						</svg>
						Withdraw
					</button>
				</div>

				<Button
					className='w-full py-[13px] flex items-center justify-center gap-[12px] mb-[12px] text-[18px]'
					onClick={() => navigate('/profile/deposit')}
				>
					<svg
						width={24}
						height={24}
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M5 15C2.79 15 1 16.79 1 19C1 19.75 1.21 20.46 1.58 21.06C2.27 22.22 3.54 23 5 23C6.46 23 7.73 22.22 8.42 21.06C8.79 20.46 9 19.75 9 19C9 16.79 7.21 15 5 15ZM6.97 18.67L4.84 20.64C4.7 20.77 4.51 20.84 4.33 20.84C4.14 20.84 3.95 20.77 3.8 20.62L2.81 19.63C2.52 19.34 2.52 18.86 2.81 18.57C3.1 18.28 3.58 18.28 3.87 18.57L4.35 19.05L5.95 17.57C6.25 17.29 6.73 17.31 7.01 17.61C7.29 17.91 7.27 18.39 6.97 18.67Z'
							fill='white'
						/>
						<path
							d='M21.5 12.5H19C17.9 12.5 17 13.4 17 14.5C17 15.6 17.9 16.5 19 16.5H21.5C21.78 16.5 22 16.28 22 16V13C22 12.72 21.78 12.5 21.5 12.5Z'
							fill='white'
						/>
						<path
							d='M16.53 5.39991C16.83 5.68991 16.58 6.13991 16.16 6.13991L7.87996 6.12991C7.39996 6.12991 7.15996 5.54991 7.49996 5.20991L9.24996 3.44991C10.73 1.97991 13.12 1.97991 14.6 3.44991L16.49 5.35991C16.5 5.36991 16.52 5.38991 16.53 5.39991Z'
							fill='white'
						/>
						<path
							d='M21.87 18.66C21.26 20.72 19.5 22 17.1 22H10.6C10.21 22 9.95999 21.57 10.12 21.21C10.42 20.51 10.61 19.72 10.61 19C10.61 15.97 8.13999 13.5 5.10999 13.5C4.34999 13.5 3.60999 13.66 2.92999 13.96C2.55999 14.12 2.10999 13.87 2.10999 13.47V12C2.10999 9.28 3.74999 7.38 6.29999 7.06C6.54999 7.02 6.81999 7 7.09999 7H17.1C17.36 7 17.61 7.01 17.85 7.05C19.87 7.28 21.33 8.51 21.87 10.34C21.97 10.67 21.73 11 21.39 11H19.1C16.93 11 15.21 12.98 15.68 15.23C16.01 16.87 17.53 18 19.2 18H21.39C21.74 18 21.97 18.34 21.87 18.66Z'
							fill='white'
						/>
					</svg>
					Deposit
				</Button>

				<div className='w-full mb-[155px]'>
					{walletAddress ? (
						<div className='w-full bg-[#181B2E] border border-[#1F233C] rounded-[12px] py-[15px] px-[16px] text-[#8A99BD] font-light mb-8 flex items-center justify-between'>
							<span>{walletAddress}</span>
							<button
								className='text-[#8A99BD]'
								onClick={() => onConnectWallet(null)}
							>
								<svg
									width={20}
									height={20}
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<g clipPath='url(#clip0_83_3322)'>
										<path
											d='M14.333 6.75C16.9564 6.75 19.083 8.87665 19.083 11.5V14.333C19.083 16.9564 16.9564 19.083 14.333 19.083H11.5C8.87665 19.083 6.75 16.9564 6.75 14.333V11.5C6.75 8.87665 8.87665 6.75 11.5 6.75H14.333ZM9.16699 0.916992C11.4219 0.917168 13.2498 2.7451 13.25 5C13.2498 5.41396 12.914 5.74982 12.5 5.75C12.086 5.74982 11.7502 5.41396 11.75 5C11.7498 3.57352 10.5935 2.41717 9.16699 2.41699H5.66699C3.87207 2.41699 2.41699 3.87207 2.41699 5.66699V9.16699C2.41717 10.5935 3.57352 11.7498 5 11.75V13.25C2.7451 13.2498 0.917168 11.4219 0.916992 9.16699V5.66699C0.916992 3.04364 3.04364 0.916992 5.66699 0.916992H9.16699Z'
											fill='#8A99BD'
										/>
									</g>
									<defs>
										<clipPath id='clip0_83_3322'>
											<rect width={20} height={20} fill='white' />
										</clipPath>
									</defs>
								</svg>
							</button>
						</div>
					) : (
						<button
							className='w-full bg-[#0077FF] rounded-xl py-[16px] text-white font-medium flex items-center justify-center gap-[14px]'
							onClick={onConnectWallet}
							disabled={isConnecting}
						>
							{isConnecting ? (
								<>
									<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
									<span>Connecting...</span>
								</>
							) : (
								<>
									<img src={tonIcon} alt='TON' className='w-[20px] h-[20px]' />
									Connect TON Wallet
								</>
							)}
						</button>
					)}
				</div>

				<button
					className='flex items-center justify-center w-full text-white text-base z-10 font-medium bg-[rgba(24,28,54,0.5)] py-[26px] dashed-border'
					onClick={() => navigate('/profile/history')}
				>
					Show History
				</button>
			</div>
		</MainBox>
	)
}

export default ProfileView
