import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JackpotHeader from '../../components/JackpotHeader/JackpotHeader'
import MainBox from '../../components/MainBox/MainBox'
import BetAmount from '../../components/UI/BetAmount/BetAmount'
import PlayerBets from '../../components/UI/PlayerBets/PlayerBets'
import RateTypeSelector from '../../components/UI/RateTypeSelector/RateTypeSelector'
import { sampleBets } from '../../data/sample-bets'
import PrizeBarrel from './views/PrizeBarrel/PrizeBarrel'

const Jackpot = () => {
	const [rateType, setRateType] = useState('balance')
	const [betAmount, setBetAmount] = useState(0.1)
	const [isBetting, setIsBetting] = useState(false)
	const navigate = useNavigate()
	const prizeBarrelRef = useRef(null)

	const handleRateTypeChange = type => {
		if (isBetting) return
		setRateType(type)
	}

	const handleBetAmountChange = amount => {
		if (isBetting) return
		setBetAmount(amount)
	}

	const handleBet = amount => {
		// Prevent multiple bets while animation is running
		if (isBetting) return

		console.log(`Placing bet of ${amount} using ${rateType}`)
		setIsBetting(true)

		// Start the slot machine animation when placing a bet
		if (prizeBarrelRef.current && prizeBarrelRef.current.startSlotMachine) {
			prizeBarrelRef.current.startSlotMachine()

			// Re-enable betting after animation completes (6.5 seconds total for spin + slowdown)
			setTimeout(() => {
				setIsBetting(false)
			}, 6500)
		} else {
			// If something went wrong with the ref, re-enable betting
			setIsBetting(false)
		}
	}

	const goToBettingHistory = () => {
		navigate('/jackpot/history')
	}

	const goToInventoryBet = () => {
		navigate('/jackpot/inventory-bet')
	}

	return (
		<MainBox className='pb-[50px]'>
			<div className='flex justify-between items-start mb-[25px]'>
				<JackpotHeader />
			</div>
			<div className='mb-[25px]'>
				<PrizeBarrel ref={prizeBarrelRef} />
			</div>
			<div className='flex flex-col gap-[25px]'>
				<RateTypeSelector
					onChange={handleRateTypeChange}
					disabled={isBetting}
				/>
				<BetAmount
					initialValue={betAmount}
					onChange={handleBetAmountChange}
					onBet={handleBet}
					disabled={isBetting}
				/>
				<PlayerBets bets={sampleBets} />
				<button
					onClick={goToBettingHistory}
					className={`text-[#8A99BD] py-[31px] px-[16px] text-[16px] font-medium bg-[#1B1E36] border border-[#222643] rounded-xl ${
						isBetting ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					disabled={isBetting}
				>
					Game history
				</button>
			</div>
		</MainBox>
	)
}

export default Jackpot
