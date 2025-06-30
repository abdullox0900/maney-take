import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'
import prizeBox from '../../../../assets/icon/prize-box-crown.svg'
import prizeBoxLeft from '../../../../assets/icon/prize-box-left.svg'
import prizeBoxRight from '../../../../assets/icon/prize-box-right.svg'
import catImg from '../../../../assets/img/cat-img.png'
import './PrizeBarrel.css'

const ITEM_WIDTH = 114 // px (width + margin)
const REPEAT = 12 // how many times to repeat the base array for smoothness
const BASE_COUNT = 10

const generatePrizeItems = count => {
	const items = []
	for (let i = 0; i < count; i++) {
		items.push({
			id: i,
			image: catImg,
			value: `$${(Math.random() * 200 + 50).toFixed(2)}`,
			discount: `${Math.floor(Math.random() * 40 + 10)}%`,
		})
	}
	return items
}

const PrizeBarrel = forwardRef((props, ref) => {
	const [selectedItem, setSelectedItem] = useState(null)
	const [winnerName, setWinnerName] = useState('Nick Name')
	const [winnerAmount, setWinnerAmount] = useState('15.12$')
	const [items, setItems] = useState([])
	const [winnerGlobalIndex, setWinnerGlobalIndex] = useState(null)
	const [isSpinning, setIsSpinning] = useState(false)
	const trackRef = useRef(null)
	const containerRef = useRef(null)
	const currentIndexRef = useRef(null)

	// Prepare repeated items for smooth scroll
	useEffect(() => {
		const base = generatePrizeItems(BASE_COUNT)
		let arr = []
		for (let i = 0; i < REPEAT; ++i) {
			arr = arr.concat(base.map((b, idx) => ({ ...b, id: i * 100 + idx })))
		}
		setItems(arr)
	}, [])

	// Center the initial position
	useEffect(() => {
		if (items.length && trackRef.current && containerRef.current) {
			const centerIdx = Math.floor(items.length / 2)
			centerOn(centerIdx, false)
			currentIndexRef.current = centerIdx
			setSelectedItem(centerIdx % BASE_COUNT)
		}
	}, [items])

	// Helper to center on a given global index
	function centerOn(globalIdx, animate = false) {
		if (!trackRef.current || !containerRef.current) return
		const containerWidth = containerRef.current.offsetWidth
		const offset =
			containerWidth / 2 - (globalIdx * ITEM_WIDTH + ITEM_WIDTH / 2)
		trackRef.current.style.transition = animate
			? 'transform 2.5s cubic-bezier(0.25,0.8,0.4,1)'
			: 'none'
		trackRef.current.style.transform = `translateX(${offset}px)`
	}

	// Main spin logic
	function startSlotMachine() {
		if (isSpinning || !items.length) return
		// Infinite scroll: if currentIndex is too close to the end, reset to middle
		let startIdx = currentIndexRef.current ?? Math.floor(items.length / 2)
		const minRounds = 2
		const safeMargin = BASE_COUNT * 3
		if (startIdx > items.length - safeMargin) {
			// Instantly jump to the middle
			const centerIdx = Math.floor(items.length / 2)
			centerOn(centerIdx, false)
			startIdx = centerIdx
			currentIndexRef.current = centerIdx
		}
		setIsSpinning(true)
		setSelectedItem(null)

		// 1. Pick a winner index in base
		const winnerBaseIdx = Math.floor(Math.random() * BASE_COUNT)
		// 2. Always spin at least 2 full rounds
		const winnerGlobalIdx = startIdx + BASE_COUNT * minRounds + winnerBaseIdx
		setWinnerGlobalIndex(winnerGlobalIdx)

		// 3. Animate to that index
		setTimeout(() => {
			centerOn(winnerGlobalIdx, true)
		}, 50)

		// 4. After animation, show result and highlight
		setTimeout(() => {
			setIsSpinning(false)
			const winner = items[winnerGlobalIdx]
			setSelectedItem(winnerGlobalIdx % BASE_COUNT)
			setWinnerName(`Player ${Math.floor(Math.random() * 1000)}`)
			setWinnerAmount(winner.value)
			currentIndexRef.current = winnerGlobalIdx
		}, 2600)
	}

	// Expose methods to parent component through ref
	useImperativeHandle(ref, () => ({
		startSlotMachine,
	}))

	// Create a single prize item component
	const PrizeItem = ({ item, index }) => {
		const isSelected = selectedItem === index % BASE_COUNT
		return (
			<div
				className={`flex flex-col items-center justify-center gap-[6px] w-[100px] h-[123px] border ${
					isSelected ? '' : 'border-[#2B2F53]'
				} rounded-[12px] p-[14px] prize-item ${
					isSelected ? 'selected-item' : ''
				}`}
			>
				<img src={item.image} alt='' />
				<span className='text-[#0fffd7] mb-[4px] text-[16px]'>
					{item.value}
				</span>
				<span className='flex items-center gap-[6px]'>
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
					<span className='text-[#0fffd7] text-[16px]'>{item.discount}</span>
				</span>
			</div>
		)
	}

	return (
		<div className='bg-[#191B31] border border-[#2B2F53] rounded-[20px]'>
			<div className='flex justify-between items-center bg-prize-box p-[20px]'>
				<div className='flex items-center flex-col gap-[6px]'>
					<img src={prizeBoxLeft} alt='prize-box-left' />
					<span className='text-[#0FFFD7] text-[16px]'>{winnerAmount}</span>
				</div>
				<div className='flex items-center flex-col gap-[6px]'>
					<img src={prizeBox} alt='prize-box' />
					<div className='flex flex-col items-center gap-[5px]'>
						<span className='center-title '>Winner</span>
						<span className='text-[#0FFFD7] text-[16px]'>{winnerName}</span>
					</div>
				</div>
				<div className='flex items-center flex-col gap-[6px]'>
					<img src={prizeBoxRight} alt='prize-box-right' />
					<span className='text-[#d5dbff] text-[16px]'>3</span>
				</div>
			</div>
			<div className='flex justify-center items-center py-[0px] border-t border-[#2B2F53] over-box'>
				<div ref={containerRef} className='prize-items-container'>
					<div ref={trackRef} className='prize-items-track'>
						{items.map((item, index) => (
							<PrizeItem
								key={`${item.id}-${index}`}
								item={item}
								index={index}
							/>
						))}
					</div>
					<div className='center-indicator'></div>
				</div>
			</div>
		</div>
	)
})

export default PrizeBarrel
