import { useEffect, useRef, useState } from 'react'
import MainBox from '../../components/MainBox/MainBox'
import './Roulette.css'

import mocIcon from '../../assets/icon/moc.png'
import soundIcon from '../../assets/icon/sound-icon.svg'
import tonIcon from '../../assets/icon/ton-icon.svg'
import KrystalBlue from '../../assets/krystal-v1.svg'
import KrystalRed from '../../assets/krystal-v2.svg'
import KrystalGreen from '../../assets/krystal-v3.svg'
import NickName from '../../assets/nick-name.svg'

const ITEM_WIDTH = 57 // px (width + gap)
const REPEAT = 15 // how many times to repeat the base array for smoothness

const baseNumbers = [
	{ number: 0, color: 'green', image: KrystalGreen },
	{ number: 1, color: 'red', image: KrystalRed },
	{ number: 8, color: 'black', image: KrystalBlue },
	{ number: 2, color: 'red', image: KrystalRed },
	{ number: 10, color: 'black', image: KrystalBlue },
	{ number: 3, color: 'red', image: KrystalRed },
	{ number: 11, color: 'black', image: KrystalBlue },
	{ number: 4, color: 'red', image: KrystalRed },
	{ number: 13, color: 'black', image: KrystalBlue },
	{ number: 5, color: 'red', image: KrystalRed },
	{ number: 9, color: 'black', image: KrystalBlue },
	{ number: 6, color: 'red', image: KrystalRed },
	{ number: 12, color: 'black', image: KrystalBlue },
	{ number: 7, color: 'red', image: KrystalRed },
	{ number: 14, color: 'black', image: KrystalBlue },
]

function getRandomIndexByType(type) {
	if (type === 'red') return Math.floor(Math.random() * 7) + 1
	if (type === 'black') return Math.floor(Math.random() * 7) + 8
	if (type === 'green') return 0
	return Math.floor(Math.random() * 15)
}

const Roulette = () => {
	const [isSpinning, setIsSpinning] = useState(false)
	const [spinResult, setSpinResult] = useState(null)
	const [winnerGlobalIndex, setWinnerGlobalIndex] = useState(null)
	const [selectedBetType, setSelectedBetType] = useState(null)
	const [items, setItems] = useState([])
	const rouletteRef = useRef(null)
	const containerRef = useRef(null)
	const currentIndexRef = useRef(null) // Track the current center index

	// Prepare repeated items for smooth scroll
	useEffect(() => {
		let arr = []
		for (let i = 0; i < REPEAT; ++i) {
			arr = arr.concat(
				baseNumbers.map((b, idx) => ({ ...b, id: i * 100 + idx }))
			)
		}
		setItems(arr)
	}, [])

	// Center the initial position
	useEffect(() => {
		if (items.length && rouletteRef.current && containerRef.current) {
			// Center the middle of the array
			const centerIdx = Math.floor(items.length / 2)
			centerOn(centerIdx, false)
			currentIndexRef.current = centerIdx
		}
	}, [items])

	// Helper to center on a given global index
	function centerOn(globalIdx, animate = false) {
		if (!rouletteRef.current || !containerRef.current) return
		const containerWidth = containerRef.current.offsetWidth
		const offset =
			containerWidth / 2 - (globalIdx * ITEM_WIDTH + ITEM_WIDTH / 2)
		rouletteRef.current.style.transition = animate
			? 'transform 2.5s cubic-bezier(0.25,0.8,0.4,1)'
			: 'none'
		rouletteRef.current.style.transform = `translateX(${offset}px)`
	}

	// Main spin logic
	function spinRoulette(betType) {
		if (isSpinning || !items.length) return
		// Infinite scroll: if currentIndex is too close to the end, reset to middle
		let startIdx = currentIndexRef.current ?? Math.floor(items.length / 2)
		const minRounds = 2
		const safeMargin = baseNumbers.length * 3
		if (startIdx > items.length - safeMargin) {
			// Instantly jump to the middle
			const centerIdx = Math.floor(items.length / 2)
			centerOn(centerIdx, false)
			startIdx = centerIdx
			currentIndexRef.current = centerIdx
		}
		setIsSpinning(true)
		setSpinResult(null)
		setSelectedBetType(betType)

		// 1. Pick a winner index in baseNumbers
		const winnerBaseIdx = getRandomIndexByType(betType)
		// 2. Always spin at least 2 full rounds
		const winnerGlobalIdx =
			startIdx + baseNumbers.length * minRounds + winnerBaseIdx
		setWinnerGlobalIndex(winnerGlobalIdx)

		// 3. Animate to that index
		setTimeout(() => {
			centerOn(winnerGlobalIdx, true)
		}, 50)

		// 4. After animation, show result and highlight
		setTimeout(() => {
			setIsSpinning(false)
			const winner = items[winnerGlobalIdx]
			setSpinResult({
				number: winner.number,
				color: winner.color,
				colorName:
					winner.number === 0
						? 'Green'
						: winner.number >= 1 && winner.number <= 7
						? 'Red'
						: 'Black',
			})
			currentIndexRef.current = winnerGlobalIdx
		}, 2600)
	}

	// Highlight winner after spin
	useEffect(() => {
		if (!isSpinning && winnerGlobalIndex !== null && rouletteRef.current) {
			const els = rouletteRef.current.querySelectorAll('.roulette-item')
			els.forEach((el, idx) => {
				el.classList.toggle('winner', idx === winnerGlobalIndex)
			})
		}
	}, [isSpinning, winnerGlobalIndex])

	// Reset highlight when spinning again
	useEffect(() => {
		if (isSpinning && rouletteRef.current) {
			const els = rouletteRef.current.querySelectorAll('.roulette-item')
			els.forEach(el => el.classList.remove('winner'))
		}
	}, [isSpinning])

	// UI
	const betCategories = [
		{
			id: 1,
			icon: KrystalRed,
			name: 'Red',
			range: '1-7',
			count: '2 Bets',
			amount: '$1.00',
			players: [
				{ name: 'Nic Name', avatar: NickName, amount: '$1.00' },
				{ name: 'Nic Name', avatar: NickName, amount: '$1.00' },
				{ name: 'Nic Name', avatar: NickName, amount: '$1.00' },
			],
		},
		{
			id: 2,
			icon: KrystalBlue,
			name: 'Black',
			range: '8-14',
			count: '2 Bets',
			amount: '$1.00',
			players: [
				{ name: 'Nic Name', avatar: NickName, amount: '$1.00' },
				{ name: 'Nic Name', avatar: NickName, amount: '$1.00' },
				{ name: 'Nic Name', avatar: NickName, amount: '$1.00' },
			],
		},
		{
			id: 3,
			icon: KrystalGreen,
			name: 'Green',
			range: '0',
			count: '2 Bets',
			amount: '$1.00',
			players: [
				{ name: 'Nic Name', avatar: NickName, amount: '$1.00' },
				{ name: 'Nic Name', avatar: NickName, amount: '$1.00' },
				{ name: 'Nic Name', avatar: NickName, amount: '$1.00' },
			],
		},
	]

	const [openCategoryId, setOpenCategoryId] = useState(null)
	const toggleCategory = categoryId => {
		setOpenCategoryId(openCategoryId === category.id ? null : categoryId)
	}

	return (
		<div className='pb-[50px]'>
			<MainBox>
				<div className='flex flex-col gap-[6px] '>
					<div className='flex items-center gap-[6px] text-[24px] font-semibold text-white'>
						<svg
							width={24}
							height={25}
							viewBox='0 0 24 25'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16.42 8.45012C18.86 10.8901 18.86 14.8501 16.42 17.2901C13.98 19.7301 10.02 19.7301 7.58 17.2901C5.14 14.8501 5.14 10.8901 7.58 8.45012C10.02 6.01012 13.98 6.01012 16.42 8.45012Z'
								fill='white'
							/>
							<path
								d='M8.25003 22.8899C8.16003 22.8899 8.06003 22.8699 7.97003 22.8399C5.72003 21.9399 3.90003 20.3499 2.68003 18.2499C1.50003 16.1999 1.03003 13.8799 1.34003 11.5199C1.39003 11.1099 1.78003 10.8199 2.18003 10.8699C2.59003 10.9199 2.88003 11.2999 2.83003 11.7099C2.57003 13.7399 2.97003 15.7399 3.98003 17.4999C5.02003 19.2999 6.59003 20.6699 8.52003 21.4399C8.90003 21.5999 9.09003 22.0299 8.94003 22.4199C8.83003 22.7099 8.54003 22.8899 8.25003 22.8899Z'
								fill='white'
							/>
							<path
								d='M5.84998 5.72986C5.62998 5.72986 5.40998 5.62986 5.25998 5.43986C4.99998 5.11986 5.05998 4.64986 5.38998 4.38986C7.28998 2.89986 9.57998 2.10986 12 2.10986C14.36 2.10986 16.61 2.86986 18.5 4.30986C18.83 4.55986 18.89 5.02986 18.64 5.35986C18.39 5.68986 17.92 5.74986 17.59 5.49986C15.96 4.25986 14.03 3.60986 12 3.60986C9.91998 3.60986 7.94998 4.28986 6.30998 5.56986C6.16998 5.67986 6.00998 5.72986 5.84998 5.72986Z'
								fill='white'
							/>
							<path
								d='M15.75 22.8901C15.45 22.8901 15.17 22.7101 15.05 22.4201C14.9 22.0401 15.08 21.6001 15.47 21.4401C17.4 20.6601 18.97 19.3001 20.01 17.5001C21.03 15.7401 21.43 13.7401 21.16 11.7201C21.11 11.3101 21.4 10.9301 21.81 10.8801C22.21 10.8301 22.6 11.1201 22.65 11.5301C22.95 13.8801 22.49 16.2101 21.31 18.2601C20.1 20.3601 18.27 21.9401 16.02 22.8501C15.94 22.8701 15.85 22.8901 15.75 22.8901Z'
								fill='white'
							/>
						</svg>
						Roulette
					</div>
					<div className='text-[18px] text-[#8A99BD] font-regular'>
						Check out the products{' '}
					</div>
				</div>
			</MainBox>

			<div className='roulette-container'>
				<div className='roulette-box' ref={containerRef}>
					<div className='roulette-center-line'></div>
					<div
						className='roulette-items'
						ref={rouletteRef}
						style={{
							transitionTimingFunction: isSpinning
								? 'cubic-bezier(0.25,0.8,0.4,1)'
								: undefined,
						}}
					>
						{items.map((item, idx) => (
							<div key={item.id} className='roulette-item'>
								<img src={item.image} alt={item.color} />
							</div>
						))}
					</div>
				</div>

				{/* {spinResult && (
					<div className='result-display'>
						<div className='result-content'>
							<span className='result-text'>Winning Number:</span>
							<div
								className='result-number'
								style={{
									color:
										spinResult.color === 'red'
											? '#FF4444'
											: spinResult.color === 'green'
											? '#44FF44'
											: '#4444FF',
								}}
							>
								{spinResult.number} ({spinResult.colorName})
							</div>
						</div>
					</div>
				)} */}
			</div>

			<MainBox>
				<div>
					<div className='flex gap-[12px] justify-center text-center text-[18px] font-medium text-white mb-[12px]'>
						Rolling
						<span className='text-[#0FFFD7]'>8.99</span>
					</div>

					<div className='w-full h-[15px] bg-[#1E223F] rounded-[12px] relative'>
						<span className='absolute top-0 left-0 w-[35%] h-[15px] bg-[#0FFFD7] rounded-[15px]'></span>
					</div>

					<div className='flex justify-between items-center my-[25px] bg-[#181B2E] rounded-[12px] py-[11px] px-[13px] border border-[#1F233C]'>
						<div className='flex items-center gap-[6px]'>
							<img src={tonIcon} alt='' />
							<span className='text-[18px] font-medium text-white'>0</span>
						</div>

						<div className='flex gap-[6px]'>
							<div className='min-w-[46px] min-h-[40px] flex items-center justify-center text-[18px] font-normal text-white p-[10px] rounded-[12px] bg-[#232843]'>
								1/2
							</div>
							<div className='min-w-[46px] min-h-[40px] flex items-center justify-center text-[18px] font-normal text-white p-[10px] rounded-[12px] bg-[#232843]'>
								2X
							</div>
							<div className='min-w-[46px] min-h-[40px] flex items-center justify-center text-[18px] font-normal text-white p-[10px] rounded-[12px] bg-[#232843]'>
								MAX
							</div>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-x-[20px] gap-y-[25px] my-[25px]'>
						<div className='border border-[#1F233C] bg-[#181B2E] px-[5px] pt-[11px] pb-[7px] rounded-[12px]'>
							<div className='flex items-center justify-between mb-[13px] px-[10px]'>
								<div className='flex items-center gap-[6px] font-bold text-[18px] text-white '>
									Win
									<span className='text-[#FF9500]'>2x</span>
								</div>
								<img src={KrystalRed} alt='' className='w-[42px] h-[42px]' />
							</div>
							<button
								className='w-full py-[13px] font-bold text-[16px] text-white rounded-[12px] bet-button-shadow bg-[#F1205F] border border-[#1F233C]'
								onClick={() => spinRoulette('red')}
								disabled={isSpinning}
							>
								{isSpinning && selectedBetType === 'red'
									? 'Spinning...'
									: 'Place Bet'}
							</button>
						</div>
						<div className='border border-[#1F233C] bg-[#181B2E] px-[5px] pt-[11px] pb-[7px] rounded-[12px]'>
							<div className='flex items-center justify-between mb-[13px] px-[10px]'>
								<div className='flex items-center gap-[6px] font-bold text-[18px] text-white '>
									Win
									<span className='text-[#FF9500]'>2x</span>
								</div>
								<img src={KrystalBlue} alt='' className='w-[42px] h-[42px]' />
							</div>
							<button
								className='w-full py-[13px] font-bold text-[16px] text-white rounded-[12px] bet-button-shadow bg-[#2D2851] border border-[#1F233C]'
								onClick={() => spinRoulette('black')}
								disabled={isSpinning}
							>
								{isSpinning && selectedBetType === 'black'
									? 'Spinning...'
									: 'Place Bet'}
							</button>
						</div>
						<div className='border border-[#1F233C] bg-[#181B2E] px-[5px] pt-[11px] pb-[7px] rounded-[12px]'>
							<div className='flex items-center justify-between mb-[13px] px-[10px]'>
								<div className='flex items-center gap-[6px] font-bold text-[18px] text-white '>
									Win
									<span className='text-[#0FFFD7]'>14x</span>
								</div>
								<img src={KrystalGreen} alt='' className='w-[42px] h-[42px]' />
							</div>
							<button
								className='w-full py-[13px] font-bold text-[16px] text-black rounded-[12px] bet-button-shadow bg-[#0FFFD7] border border-[#1F233C]'
								onClick={() => spinRoulette('green')}
								disabled={isSpinning}
							>
								{isSpinning && selectedBetType === 'green'
									? 'Spinning...'
									: 'Place Bet'}
							</button>
						</div>
					</div>

					<div className='flex flex-col gap-[12px] my-[25px]'>
						{betCategories.map(category => (
							<div className='w-full' key={category.id}>
								<div
									className={`w-full bg-[rgba(28,31,51,0.5)] px-[20px] py-[10px] rounded-[10px] border border-[#1F233C] cursor-pointer ${
										openCategoryId === category.id ? 'rounded-b-[0px]' : ''
									}`}
									onClick={() => toggleCategory(category.id)}
								>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-3'>
											<img
												src={category.icon}
												alt=''
												className='w-[42px] h-[42px] rounded-[12px]'
											/>
											<span className='text-white font-medium'>
												{category.count}
											</span>
										</div>
										<div className='flex items-center gap-[12px]'>
											<div className='text-[#0FFFD7] font-medium'>
												{category.amount}
											</div>
											<div className='text-white'>
												{openCategoryId === category.id ? (
													<svg
														width={24}
														height={24}
														viewBox='0 0 24 24'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path
															d='M10.49 8.79982L8.51999 10.7698L5.30999 13.9798C4.63999 14.6598 5.11999 15.8198 6.07999 15.8198H12.31L17.92 15.8198C18.88 15.8198 19.36 14.6598 18.68 13.9798L13.5 8.79982C12.68 7.96982 11.32 7.96982 10.49 8.79982Z'
															fill='#8A99BD'
														/>
													</svg>
												) : (
													<svg
														width={24}
														height={24}
														viewBox='0 0 24 24'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path
															d='M13.51 15.2002L15.48 13.2302L18.69 10.0202C19.36 9.34018 18.88 8.18018 17.92 8.18018L11.69 8.18018H6.08001C5.12001 8.18018 4.64001 9.34018 5.32001 10.0202L10.5 15.2002C11.32 16.0302 12.68 16.0302 13.51 15.2002Z'
															fill='#8A99BD'
														/>
													</svg>
												)}
											</div>
										</div>
									</div>
								</div>

								{openCategoryId === category.id && (
									<div className='w-full bg-[rgba(28,31,51,0.5)] rounded-b-[10px] border border-[#1F233C] border-t-0'>
										{category.players.map((player, playerIndex) => (
											<div
												className='divide-y divide-[#1F233C]'
												key={playerIndex}
											>
												<div className='flex items-center justify-between px-[20px] py-[10px]'>
													<div className='flex items-center gap-3'>
														<img
															src={player.avatar}
															alt=''
															className='w-[42px] h-[42px]'
														/>
														<span className='text-white font-light'>
															{player.name}
														</span>
													</div>
													<div className='flex items-center gap-[12px]'>
														<div className='text-[#0FFFD7] font-medium'>
															{player.amount}
														</div>
														<img
															src={tonIcon}
															alt=''
															className='w-[20px] h-[24px]'
														/>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>

					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-[12px]'>
							<span className='text-[#8A99BD]'>Last 100:</span>
							<div className='flex items-center gap-[6px]'>
								<div className='flex items-center gap-[6px]'>
									<span className='text-white'>47</span>
									<img
										src={KrystalGreen}
										alt=''
										className='w-[20px] h-[20px]'
									/>
								</div>
								<div className='flex items-center gap-[6px]'>
									<span className='text-white'>24</span>
									<img src={KrystalRed} alt='' className='w-[20px] h-[20px]' />
								</div>
								<div className='flex items-center gap-[6px]'>
									<span className='text-white'>12</span>
									<img src={KrystalBlue} alt='' className='w-[20px] h-[20px]' />
								</div>
							</div>
						</div>
						<div className='flex items-center gap-[25px]'>
							<button>
								<img src={soundIcon} alt='' />
							</button>
							<button>
								<img src={mocIcon} alt='' />
							</button>
						</div>
					</div>

					<div className='flex items-center justify-center gap-[15px] my-[25px] py-[10px] px-[8px] bg-[#181B2E] rounded-[12px] border border-[#1F233C] overflow-hidden'>
						<img src={KrystalRed} alt='' className='w-[42px] h-[42px]' />
						<img src={KrystalRed} alt='' className='w-[42px] h-[42px]' />
						<img src={KrystalRed} alt='' className='w-[42px] h-[42px]' />
						<img src={KrystalBlue} alt='' className='w-[42px] h-[42px]' />
						<img src={KrystalBlue} alt='' className='w-[42px] h-[42px]' />
						<img src={KrystalGreen} alt='' className='w-[42px] h-[42px]' />
					</div>
				</div>
			</MainBox>
		</div>
	)
}

export default Roulette
