import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import boxIcon from '../../../assets/icon/box.svg'
import tonIcon from '../../../assets/icon/ton-icon.svg'
import Box from '../../../components/Box/Box'
import Button from '../../../components/UI/Button/Button'
import { inventoryItems as initialItems } from '../../../data/inventory-items'
import './InventoryBetView.css'

const InventoryBetView = () => {
	const [items, setItems] = useState([])
	const [showBetButton, setShowBetButton] = useState(false)
	const [isEmpty, setIsEmpty] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		// For demo purposes, we can toggle between empty and filled state
		if (isEmpty) {
			setItems([])
		} else {
			setItems(initialItems)
		}
	}, [isEmpty])

	useEffect(() => {
		const hasActiveItems = items.some(item => item.isActive)
		setShowBetButton(hasActiveItems)
	}, [items])

	const toggleItemActive = id => {
		setItems(
			items.map(item =>
				item.id === id ? { ...item, isActive: !item.isActive } : item
			)
		)

		// Check if any item is active after update
		setTimeout(() => {
			const hasActiveItem = items.some(item =>
				item.id === id ? !item.isActive : item.isActive
			)
			setShowBetButton(hasActiveItem)
		}, 0)
	}

	// Calculate total value of active items
	const totalValue = items
		.filter(item => item.isActive)
		.reduce((sum, item) => sum + item.value, 0)

	return (
		<Box
			title='Make a bet'
			subtitle='Choose one or more gigs from your inventory'
			onClose={() => navigate('/jackpot')}
		>
			{/* Content */}
			<div className='pb-[150px]'>
				{items.length === 0 ? (
					// Empty state
					<div className='h-[calc(100vh-300px)] flex flex-col items-center justify-center'>
						<div className='w-[80px] h-[80px] mb-5'>
							<img src={boxIcon} alt='empty-state' className='w-full h-full' />
						</div>
						<p className='text-white text-center mb-5'>
							Your inventory is empty
						</p>
						<Button
							className='px-10 w-[200px]'
							onClick={() => navigate('/shop')}
						>
							Shop
						</Button>
					</div>
				) : (
					// Item grid
					<div className='grid grid-cols-2 gap-[15px] max-[390px]:gap-[10px]'>
						{filteredItems.map(item => (
							<div
								key={item.id}
								className={`inventory-card rounded-[10px] overflow-hidden ${
									item.isActive ? 'active' : ''
								}`}
								onClick={() => toggleItemActive(item.id)}
							>
								<div className='inventory-image aspect-square w-full bg-[#8A2BE2]'>
									<img
										src={item.image}
										alt={item.name}
										className='w-full h-full object-cover'
										onError={e => {
											e.target.onerror = null
											e.target.src =
												"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%238A2BE2'/%3E%3C/svg%3E"
										}}
									/>
								</div>
								<div className='p-[10px] bg-[rgba(27,30,54,0.56)]'>
									<p className='text-white text-[14px]'>{item.name}</p>
									<p className='text-[#8a99bd] text-[14px] mb-[10px]'>
										#{item.id}
									</p>
									<div className='bg-[#0077FF] text-white rounded-[10px] flex justify-center gap-[8px] items-center py-1'>
										<span>1</span>
										<img
											src={tonIcon}
											alt='ton'
											className='w-[16px] h-[16px]'
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Bet button */}
				{showBetButton && (
					<div className='fixed bottom-[80px] left-[20px] right-[20px]'>
						<Button className='w-full flex justify-center items-center gap-3 py-3'>
							<span className='font-bold'>BET</span>
							<div className='flex items-center gap-[8px]'>
								<img src={tonIcon} alt='ton' className='w-[16px] h-[16px]' />
								<span className='text-[16px]'>{totalValue}</span>
							</div>
						</Button>
					</div>
				)}
			</div>
		</Box>
	)
}

export default InventoryBetView
