import React from 'react'
import { useNavigate } from 'react-router-dom'
import tonIcon from '../../../assets/icon/ton-icon.svg'
import Box from '../../../components/Box/Box'
import Button from '../../../components/UI/Button/Button'

const WithdrawView = () => {
	const navigate = useNavigate()

	return (
		<Box
			title='Withdraw'
			subtitle='Withdraw your funds'
			onClose={() => navigate('/profile')}
		>
			<div className='flex justify-between items-center bg-[rgba(28,31,51,0.5)] border border-[#1F233C] p-[8px] rounded-xl mb-[25px]'>
				<div className='flex items-center gap-[10px] p-[10px] rounded-xl bg-[rgba(28,31,51,0.5)] border border-[#1F233C]'>
					<img src={tonIcon} alt='ton' />
					<span className='text-white text-[18px] font-regular'>TON</span>
				</div>
				<span className='text-white text-[18px] font-regular'>$0.00</span>
			</div>

			<div className='flex flex-col'>
				<div className='flex flex-col gap-[25px] p-[20px] rounded-xl bg-[rgba(28,31,51,0.5)] border border-[#1F233C] mb-[25px]'>
					<div className='flex flex-col gap-[10px]'>
						<label className='text-[18px] text-white'>Withdraw</label>
						<input
							type='text'
							placeholder='Address'
							className='bg-[rgba(28,31,51,0.5)] border border-[#1F233C] rounded-xl p-[10px] text-white w-full'
						/>
					</div>

					<div className='flex flex-col gap-[10px]'>
						<label className='text-[18px] text-white'>
							Destination Tag (optional)
						</label>
						<input
							type='text'
							placeholder='Tag'
							className='bg-[rgba(28,31,51,0.5)] border border-[#1F233C] rounded-xl p-[10px] text-white w-full'
						/>
					</div>

					<div className='flex flex-col gap-[10px]'>
						<label className='text-[18px] text-white'>Amount to Withdraw</label>
						<input
							type='text'
							defaultValue='$0.00'
							className='bg-[rgba(28,31,51,0.5)] border border-[#1F233C] rounded-xl p-[10px] text-white w-full'
						/>
						<p className='text-[14px] text-[#8A99BD] font-regular'>
							Minimum withdrawal amount $10.00
						</p>
					</div>
				</div>

				<Button className=' text-white font-medium py-[14px]'>Withdraw</Button>
			</div>
		</Box>
	)
}

export default WithdrawView
