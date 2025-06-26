import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import nickName from '../../../assets/nick-name.svg'
import Box from '../../../components/Box/Box'
import { jackpotHistory } from '../../../data/jackpot-history'

const BettingHistoryView = () => {
	const navigate = useNavigate()
	const [bettingHistory] = useState(jackpotHistory)

	return (
		<Box title='Latest Games' onClose={() => navigate('/jackpot')}>
			{/* Betting History List */}
			<div className='pb-[100px]'>
				<div className='flex flex-col gap-[25px]'>
					{bettingHistory.map(bet => (
						<div
							key={bet.id}
							className='flex items-center justify-between py-[9px] px-[16px] rounded-[12px] bg-[#1C2038]'
						>
							<div className='flex items-center gap-[12px]'>
								<div className='w-[42px] h-[42px] rounded-[12px] overflow-hidden flex items-center justify-center'>
									<img src={nickName} alt='Profile' className='w-full h-full' />
								</div>
								<div className='flex flex-col'>
									<span className='text-white text-[16px] font-medium'>
										{bet.name}
									</span>
									<div className='flex items-center gap-[6px]'>
										<span className='text-[#0FFFD7] text-[16px]'>
											{bet.amount}
										</span>
										<svg
											width={14}
											height={15}
											viewBox='0 0 14 15'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M11.7269 0.5H2.27194C0.533579 0.5 -0.567931 2.375 0.306874 3.89179L6.1415 14.0049C6.52223 14.665 7.47664 14.665 7.85737 14.0049L13.6937 3.89092C14.5677 2.3776 13.4653 0.5 11.7278 0.5H11.7269ZM6.13718 10.9713L4.86607 8.51224L1.79949 3.02827C1.7529 2.94636 1.72875 2.8536 1.72947 2.75937C1.73019 2.66514 1.75576 2.57277 1.80359 2.49158C1.85143 2.4104 1.91984 2.34326 2.00192 2.29697C2.084 2.25067 2.17684 2.22685 2.27108 2.22791H6.13458V10.973L6.13631 10.9713H6.13718ZM12.1968 3.0274L9.13194 8.5131L7.86083 10.9713V2.22618H11.7261C12.1501 2.22618 12.3993 2.67611 12.1968 3.0274Z'
												fill='#0FFFD7'
											/>
										</svg>
									</div>
								</div>
							</div>

							<div className='flex items-center gap-[12px]'>
								<div className='flex items-center gap-[6px]'>
									<svg
										width={24}
										height={24}
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9 8C9.55 8 10 8.45 10 9C10 9.55 9.56 10 9 10C8.45 10 8 9.55 8 9C8 8.45 8.45 8 9 8ZM9.53 15.53C9.38 15.68 9.19 15.75 9 15.75C8.81 15.75 8.62 15.68 8.47 15.53C8.18 15.24 8.18 14.76 8.47 14.47L14.47 8.47C14.76 8.18 15.24 8.18 15.53 8.47C15.82 8.76 15.82 9.24 15.53 9.53L9.53 15.53ZM15 16C14.44 16 13.99 15.55 13.99 15C13.99 14.45 14.44 14 14.99 14C15.54 14 15.99 14.45 15.99 15C15.99 15.55 15.55 16 15 16Z'
											fill='#0FFFD7'
										/>
									</svg>
									<div className='flex items-center justify-center rounded-full  text-[#0FFFD7] text-[16px] font-medium'>
										25%
									</div>
								</div>
								<span className='text-[#8A99BD] text-[16px]'>Learn more</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</Box>
	)
}

export default BettingHistoryView
