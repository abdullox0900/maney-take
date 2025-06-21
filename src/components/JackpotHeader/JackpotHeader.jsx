import React from 'react'
import jackpotCrownIcon from '../../assets/icon/jackpot-header-crown.svg'
import mock from '../../assets/icon/moc.png'
import voiceIcon from '../../assets/icon/sound-icon.svg'

const JackpotHeader = ({ variant }) => {
	return (
		<div className='flex justify-between items-center mb-[25px]'>
			<div className='flex flex-col gap-[6px] '>
				<div className='flex items-center gap-[6px] text-[24px] font-semibold text-white'>
					<img
						src={jackpotCrownIcon}
						alt='jackpot-crown'
						className='w-[24px] h-[24px]'
					/>
					Jackpot
				</div>
				<div className='text-[18px] text-[#8A99BD] font-regular'>
					It takes two to start the game
				</div>
			</div>

			{variant === 'voice' ? (
				<div className='flex items-center gap-[25px]'>
					<button>
						<img src={voiceIcon} alt='voice' />
					</button>
					<button>
						<img src={mock} alt='close' />
					</button>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default JackpotHeader
