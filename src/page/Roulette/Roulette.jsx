import { useEffect, useRef, useState } from 'react'
import MainBox from '../../components/MainBox/MainBox'
import Button from '../../components/UI/Button/Button'
import './Roulette.css'

import KrystalRed from '../../assets/krystal-v1.svg'
import KrystalBlue from '../../assets/krystal-v2.svg'
import KrystalGreen from '../../assets/krystal-v3.svg'

const Roulette = () => {
	const [isSpinning, setIsSpinning] = useState(false)
	const [spinResult, setSpinResult] = useState(null)
	const rouletteRef = useRef(null)
	const [items, setItems] = useState([])

	// Create base items
	useEffect(() => {
		const baseItems = []
		for (let i = 0; i < 20; i++) {
			const types = ['red', 'blue', 'green']
			const itemImages = [KrystalRed, KrystalBlue, KrystalGreen]
			const typeIndex = i % 3

			baseItems.push({
				id: i + 1,
				item: itemImages[typeIndex],
				type: types[typeIndex],
			})
		}

		// Clone items multiple times to create a longer list (like in jQuery example)
		let allItems = [...baseItems]
		for (let i = 0; i < 3; i++) {
			allItems = [
				...allItems,
				...baseItems.map((item, index) => ({
					...item,
					id: item.id + baseItems.length * (i + 1),
				})),
			]
		}

		setItems(allItems)
	}, [])

	const spinRoulette = () => {
		if (isSpinning) return

		setIsSpinning(true)
		setSpinResult(null)

		// Random winning index (similar to the jQuery example)
		const randomIndex = Math.floor(Math.random() * (items.length - 30)) + 30
		const winningItem = items[randomIndex]

		// Calculate position to move the roulette
		// Each item is 45px wide with 12px gap (57px total)
		const itemWidth = 57
		const centerOffset = window.innerWidth / 2 - itemWidth / 2
		const scrollAmount = randomIndex * itemWidth - centerOffset

		if (rouletteRef.current) {
			// Reset position first without animation
			rouletteRef.current.style.transition = 'none'
			rouletteRef.current.style.transform = 'translateX(0)'

			// Force reflow to make sure the reset takes effect
			void rouletteRef.current.offsetWidth

			// Start animation
			rouletteRef.current.style.transition =
				'transform 10s cubic-bezier(0.1, 0.7, 0.1, 1)'
			rouletteRef.current.style.transform = `translateX(-${scrollAmount}px)`

			// Highlight winning item after animation completes
			setTimeout(() => {
				setIsSpinning(false)
				setSpinResult(winningItem.type)

				// Add highlight to the winning item
				const itemElements =
					rouletteRef.current.querySelectorAll('.roulette-item')
				if (itemElements[randomIndex]) {
					itemElements.forEach(el => el.classList.remove('winner'))
					itemElements[randomIndex].classList.add('winner')
				}
			}, 10000)
		}
	}

	return (
		<>
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
				<div className='roulette-box'>
					<div className='roulette-center-line'></div>
					<div className='roulette-items' ref={rouletteRef}>
						{items.map(item => (
							<div key={item.id} className='roulette-item'>
								<img src={item.item} alt={item.type} />
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='flex justify-center mt-4'>
				<Button
					className={`${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
					onClick={spinRoulette}
					disabled={isSpinning}
				>
					{isSpinning ? 'Spinning...' : 'Spin Roulette'}
				</Button>
			</div>

			{spinResult && (
				<div className='text-center mt-4 text-white text-xl'>
					Result:{' '}
					<span
						className={`font-bold ${
							spinResult === 'red'
								? 'text-red-400'
								: spinResult === 'blue'
								? 'text-blue-400'
								: 'text-green-400'
						}`}
					>
						{spinResult.toUpperCase()}
					</span>
				</div>
			)}
		</>
	)
}

export default Roulette
