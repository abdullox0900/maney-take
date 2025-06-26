import React from 'react'
import { useNavigate } from 'react-router-dom'
import tonIcon from '../../../assets/icon/ton-icon.svg'
import Box from '../../../components/Box/Box'
import Button from '../../../components/UI/Button/Button'

const DepositView = () => {
	const navigate = useNavigate()

	return (
		<Box title='Add Funds' onClose={() => navigate('/profile')}>
			<div className='flex flex-col gap-[25px]'>
				<div className='flex flex-col gap-[10px]'>
					<label className='text-[18px] text-white'>Token</label>
					<div className='bg-[rgba(28,31,51,0.5)] border border-[#1F233C] rounded-xl p-[10px] flex items-center gap-[10px]'>
						<div className='flex items-center gap-[10px] p-[10px] rounded-xl bg-[rgba(28,31,51,0.5)] border border-[#1F233C]'>
							<img src={tonIcon} alt='ton' />
							<span className='text-white text-[18px] font-regular'>TON</span>
						</div>
					</div>
				</div>

				<div className='flex flex-col gap-[10px]'>
					<label className='text-[18px] text-white'>Amount to add</label>
					<div className='bg-[rgba(28,31,51,0.5)] border border-[#1F233C] rounded-xl p-[10px] flex justify-between items-center'>
						<div className='flex items-center gap-[10px]'>
							<div className='flex items-center gap-[10px] p-[10px] rounded-xl bg-[rgba(28,31,51,0.5)] border border-[#1F233C]'>
								<img src={tonIcon} alt='ton' />
								<span className='text-white text-[18px] font-regular'>TON</span>
							</div>
						</div>
						<div className='flex items-center gap-[10px]'>
							<span className='text-white text-[18px] font-regular'>$0.00</span>
							<span className='bg-[#232843] border border-[#1F233C] text-white text-[18px] font-regular rounded-lg px-[10px] py-[5px]'>
								MAX
							</span>
						</div>
					</div>
				</div>

				<Button className=' text-white font-medium py-4 rounded-xl'>
					Add Funds
				</Button>
			</div>
		</Box>
	)
}

export default DepositView
