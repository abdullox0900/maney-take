import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import boxIcon from '../../../assets/icon/box.svg'
import Box from '../../../components/Box/Box'

const HistoryView = () => {
	const [activeTab, setActiveTab] = useState('withdrawals') // 'withdrawals', 'deposits', 'casino'
	const navigate = useNavigate()

	return (
		<Box
			title='History'
			subtitle='Information on your transactions'
			onClose={() => navigate('/profile')}
		>
			<div className='flex justify-between p-[8px] rounded-xl bg-[rgba(28,31,51,0.5)] border border-[#1F233C]'>
				<button
					className={`p-[11px] text-[14px] relative ${
						activeTab === 'withdrawals'
							? 'text-white bg-[rgba(28,31,51,0.5)] border border-[#1F233C] rounded-xl'
							: 'text-[#8A99BD] border border-transparent'
					}`}
					onClick={() => setActiveTab('withdrawals')}
				>
					Withdrawals
				</button>
				<button
					className={`p-[11px] text-[14px] relative ${
						activeTab === 'deposits'
							? 'text-white bg-[rgba(28,31,51,0.5)] border border-[#1F233C] rounded-xl'
							: 'text-[#8A99BD] border border-transparent'
					}`}
					onClick={() => setActiveTab('deposits')}
				>
					Deposits
				</button>
				<button
					className={`p-[11px] text-[14px] relative  ${
						activeTab === 'casino'
							? 'text-white bg-[rgba(28,31,51,0.5)] border border-[#1F233C] rounded-xl'
							: 'text-[#8A99BD] border border-transparent'
					}`}
					onClick={() => setActiveTab('casino')}
				>
					Casino Bets
				</button>
			</div>

			{activeTab === 'casino' && (
				<div className='my-[25px]'>
					<div className='flex justify-between pb-[20px] border-b border-[#1F233C]'>
						<div className='text-[16px] font-regular text-[#8A99BD]'>Game</div>
						<div className='text-[16px] font-regular text-[#8A99BD]'>
							Amount
						</div>
						<div className='text-[16px] font-regular text-[#8A99BD]'>
							Bet ID
						</div>
					</div>

					<div className='flex flex-col items-center justify-center pt-[130px]'>
						<div className='mb-[25px]'>
							<img
								src={boxIcon}
								alt='empty-state'
								className='w-[64px] h-[64px]'
							/>
						</div>
						<p className='text-white text-[18px]'>No transactions</p>
					</div>
				</div>
			)}

			{activeTab === 'withdrawals' && (
				<div className='my-[25px]'>
					<div className='flex justify-between pb-[20px] border-b border-[#1F233C]'>
						<div className='text-[16px] font-regular text-[#8A99BD]'>Game</div>
						<div className='text-[16px] font-regular text-[#8A99BD]'>
							Amount
						</div>
						<div className='text-[16px] font-regular text-[#8A99BD]'>T ID</div>
						<div className='text-[16px] font-regular text-[#8A99BD]'>
							Status
						</div>
					</div>

					<div className='flex flex-col items-center justify-center pt-[130px]'>
						<div className='mb-[25px]'>
							<img
								src={boxIcon}
								alt='empty-state'
								className='w-[64px] h-[64px]'
							/>
						</div>
						<p className='text-white text-[18px]'>No transactions</p>
					</div>
				</div>
			)}

			{activeTab === 'deposits' && (
				<div className='my-[25px]'>
					<div className='flex justify-between pb-[20px] border-b border-[#1F233C]'>
						<div className='text-[16px] font-regular text-[#8A99BD]'>Game</div>
						<div className='text-[16px] font-regular text-[#8A99BD]'>
							Amount
						</div>
						<div className='text-[16px] font-regular text-[#8A99BD]'>
							Bet ID
						</div>
					</div>

					<div className='flex flex-col items-center justify-center pt-[130px]'>
						<div className='mb-[25px]'>
							<img
								src={boxIcon}
								alt='empty-state'
								className='w-[64px] h-[64px]'
							/>
						</div>
						<p className='text-white text-[18px]'>No transactions</p>
					</div>
				</div>
			)}
		</Box>
	)
}

export default HistoryView
