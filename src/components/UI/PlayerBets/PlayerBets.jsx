import scannerIcon from '../../../assets/icon/scanner.svg'

const PlayerBets = ({ bets = [] }) => {
	return (
		<div className='flex flex-col gap-[25px]'>
			<div className='flex items-center gap-[6px]'>
				<img src={scannerIcon} alt='' className='w-[24px] h-[24px]' />
				<h3 className='text-white text-[21px] font-semibold'>Player bets</h3>
			</div>

			<div className='flex flex-col overflow-hidden'>
				{bets.length > 0 ? (
					bets.map((bet, index) => (
						<div
							key={index}
							className='flex items-center justify-between gap-[12px] py-[12px] border-b border-[#2a2c35] last:border-b-0'
						>
							<div className='flex items-center gap-2.5 flex-1'>
								<div className='w-[42px] h-[42px] rounded-[12px] overflow-hidden'>
									<img
										src={bet.avatar}
										alt={bet.name}
										className='w-full h-full object-cover'
									/>
								</div>
								<div className='text-white font-medium text-[16px]'>
									{bet.name}
								</div>
							</div>

							<div
								className={`flex items-center gap-1 font-semibold min-w-[80px] ${
									bet.trend === 'up' ? 'text-[#0FFFD7]' : 'text-[#FF00A1]'
								}`}
							>
								<span className='text-sm'>
									{bet.trend === 'up' ? (
										<svg
											width={24}
											height={24}
											viewBox='0 0 24 24'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M18.6799 13.98L15.4699 10.77L13.5099 8.79999C12.6799 7.96999 11.3299 7.96999 10.4999 8.79999L5.31995 13.98C4.63995 14.66 5.12995 15.82 6.07995 15.82H11.6899H17.9199C18.8799 15.82 19.36 14.66 18.6799 13.98Z'
												fill='#0FFFD7'
											/>
										</svg>
									) : (
										<svg
											width={25}
											height={25}
											viewBox='0 0 25 25'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M5.40804 10.184L8.64618 13.3656L10.6234 15.3183C11.4607 16.1409 12.8107 16.129 13.6333 15.2918L18.7675 10.0664C19.4415 9.3804 18.9413 8.22476 17.9913 8.23312L12.3816 8.28252L6.1518 8.33738C5.19184 8.34583 4.72207 9.51002 5.40804 10.184Z'
												fill='#FF00A2'
											/>
										</svg>
									)}
								</span>
								${bet.amount}
							</div>

							<div className='flex items-center gap-1 text-white min-w-[70px]'>
								<span className='text-sm'>
									<svg
										width={24}
										height={24}
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9 8C9.55 8 10 8.45 10 9C10 9.55 9.56 10 9 10C8.45 10 8 9.55 8 9C8 8.45 8.45 8 9 8ZM9.53 15.53C9.38 15.68 9.19 15.75 9 15.75C8.81 15.75 8.62 15.68 8.47 15.53C8.18 15.24 8.18 14.76 8.47 14.47L14.47 8.47C14.76 8.18 15.24 8.18 15.53 8.47C15.82 8.76 15.82 9.24 15.53 9.53L9.53 15.53ZM15 16C14.44 16 13.99 15.55 13.99 15C13.99 14.45 14.44 14 14.99 14C15.54 14 15.99 14.45 15.99 15C15.99 15.55 15.55 16 15 16Z'
											fill='white'
										/>
									</svg>
								</span>
								{bet.chance}%
							</div>

							<div className='text-[#8A99BD] text-[16px]'>{bet.time}</div>
						</div>
					))
				) : (
					<div className='py-6 text-center text-[#6c7293]'>No active bets</div>
				)}
			</div>
		</div>
	)
}

export default PlayerBets
