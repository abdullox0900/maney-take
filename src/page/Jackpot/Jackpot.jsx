import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JackpotHeader from '../../components/JackpotHeader/JackpotHeader'
import MainBox from '../../components/MainBox/MainBox'
import BetAmount from '../../components/UI/BetAmount/BetAmount'
import PlayerBets from '../../components/UI/PlayerBets/PlayerBets'
import RateTypeSelector from '../../components/UI/RateTypeSelector/RateTypeSelector'
import { sampleBets } from '../../data/sample-bets'

const Jackpot = () => {
	const [rateType, setRateType] = useState('balance')
	const [betAmount, setBetAmount] = useState(0.1)
	const navigate = useNavigate()

	const handleRateTypeChange = type => {
		setRateType(type)
	}

	const handleBetAmountChange = amount => {
		setBetAmount(amount)
	}

	const handleBet = amount => {
		console.log(`Placing bet of ${amount} using ${rateType}`)
		// Add bet logic here
	}

	const goToBettingHistory = () => {
		navigate('/jackpot/history')
	}

	const goToInventoryBet = () => {
		navigate('/jackpot/inventory-bet')
	}

	return (
		<MainBox className='pb-[200px]'>
			<div className='flex justify-between items-start mb-[25px]'>
				<JackpotHeader />
				<div className='flex gap-2'>
					<button
						onClick={goToInventoryBet}
						className='text-[#8A99BD] text-[14px] font-medium bg-[rgba(28,31,51,0.5)] border border-[#1F233C] rounded-xl py-2 px-3'
					>
						Inventory
					</button>
				</div>
			</div>
			<div className='flex flex-col gap-[25px]'>
				<RateTypeSelector onChange={handleRateTypeChange} />
				<BetAmount
					initialValue={betAmount}
					onChange={handleBetAmountChange}
					onBet={handleBet}
				/>
				<PlayerBets bets={sampleBets} />
				<button
					onClick={goToBettingHistory}
					className='text-[#8A99BD] py-[31px] px-[16px] text-[16px] font-medium bg-[#1B1E36] border border-[#222643] rounded-xl'
				>
					Game history
				</button>
			</div>
		</MainBox>
	)
}

export default Jackpot
