import { useState } from 'react'
import JackpotHeader from '../../components/JackpotHeader/JackpotHeader'
import MainBox from '../../components/MainBox/MainBox'
import BetAmount from '../../components/UI/BetAmount/BetAmount'
import PlayerBets from '../../components/UI/PlayerBets/PlayerBets'
import RateTypeSelector from '../../components/UI/RateTypeSelector/RateTypeSelector'
import { sampleBets } from '../../data/sample-bets'

const Jackpot = () => {
	const [rateType, setRateType] = useState('balance')
	const [betAmount, setBetAmount] = useState(0.1)

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

	return (
		<MainBox className='pb-[200px]'>
			<JackpotHeader />
			<div className='flex flex-col gap-[25px]'>
				<RateTypeSelector onChange={handleRateTypeChange} />
				<BetAmount
					initialValue={betAmount}
					onChange={handleBetAmountChange}
					onBet={handleBet}
				/>
				<PlayerBets bets={sampleBets} />
			</div>
		</MainBox>
	)
}

export default Jackpot
