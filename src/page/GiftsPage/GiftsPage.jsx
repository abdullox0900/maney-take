import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import boxIcon from '../../assets/icon/box.svg'
import closeIcon from '../../assets/icon/close-icon.svg'
import tonIcon from '../../assets/icon/ton-icon.svg'
import Button from '../../components/UI/Button/Button'
import { gifts as initialGifts } from '../../data/gifts'
import './GiftsPage.css'

const GiftsPage = () => {
	const [gifts, setGifts] = useState([])
	const [showWithdraw, setShowWithdraw] = useState(false)
	const [isEmpty, setIsEmpty] = useState(false)
	const [showSellModal, setShowSellModal] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		// For demo purposes, we can toggle between empty and filled state
		if (isEmpty) {
			setGifts([])
		} else {
			setGifts(initialGifts)
		}
	}, [isEmpty])

	// Cleanup effect to restore body scroll on unmount
	useEffect(() => {
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])

	const toggleGiftActive = id => {
		setGifts(
			gifts.map(gift =>
				gift.id === id ? { ...gift, isActive: !gift.isActive } : gift
			)
		)

		// Check if any gift is active after update
		setTimeout(() => {
			const hasActiveGift = gifts.some(gift =>
				gift.id === id ? !gift.isActive : gift.isActive
			)
			setShowWithdraw(hasActiveGift)
		}, 0)
	}

	// Calculate total value of active gifts
	const totalValue = gifts
		.filter(gift => gift.isActive)
		.reduce((sum, gift) => sum + gift.value, 0)

	const handleSell = () => {
		setShowSellModal(true)
		// Prevent body scroll when modal is open
		document.body.style.overflow = 'hidden'
	}

	const confirmSell = () => {
		// Handle sell logic here
		console.log('Selling gifts for:', totalValue)
		setShowSellModal(false)
		// Restore body scroll
		document.body.style.overflow = 'unset'
		// Reset active gifts
		setGifts(gifts.map(gift => ({ ...gift, isActive: false })))
		setShowWithdraw(false)
	}

	const closeSellModal = () => {
		setShowSellModal(false)
		// Restore body scroll
		document.body.style.overflow = 'unset'
	}

	const handleWithdraw = () => {
		// Handle withdraw logic here
		console.log('Withdrawing gifts for:', totalValue)
		// Reset active gifts
		setGifts(gifts.map(gift => ({ ...gift, isActive: false })))
		setShowWithdraw(false)
	}

	return (
		<div className='flex flex-col z-50 pt-[33px] px-[40px] h-auto border border-[#2B2F53] rounded-t-[30px] gifts-page max-[390px]:px-[20px]'>
			{/* Header */}
			<div className='flex justify-center items-center mb-[25px] relative'>
				<h1 className='text-white text-xl font-medium text-center'>My Gifts</h1>
				<button
					onClick={() => navigate(-1)}
					className='text-white text-2xl absolute right-[20px]'
				>
					<img src={closeIcon} alt='close' />
				</button>
			</div>

			{/* Content */}
			<div className='pb-[50px]'>
				{gifts.length === 0 ? (
					// Empty state
					<div className='h-[calc(100vh-300px)] flex flex-col items-center justify-center'>
						<img src={boxIcon} alt='empty-state' />
					</div>
				) : (
					// Gift grid
					<div className='grid grid-cols-2 gap-[20px] max-[390px]:gap-[15px]'>
						{gifts.map(gift => (
							<div
								key={gift.id}
								className={`gift-card rounded-[10px] p-[12px] overflow-hidden ${
									gift.isActive ? 'active' : ''
								}`}
								onClick={() => toggleGiftActive(gift.id)}
							>
								<div className='gift-image aspect-square mb-[12px] w-full h-[145px]'>
									<img
										src={gift.image}
										alt={gift.name}
										className='w-full h-full object-cover'
										onError={e => {
											e.target.onerror = null
											e.target.src =
												"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23a855f7'/%3E%3Cpath d='M60,40 C65,45 65,55 60,60 C55,65 45,65 40,60 C35,55 35,45 40,40 C45,35 55,35 60,40 Z' fill='%237e22ce'/%3E%3Ccircle cx='45' cy='45' r='5' fill='white'/%3E%3C/svg%3E"
										}}
									/>
								</div>
								<div>
									<p className='text-white text-[18px] mb-[12px]'>
										{gift.name}
									</p>
									<p className='text-[#8a99bd] text-[18px] mb-[12px]'>
										#{gift.id}
									</p>
									<div className='bg-[#0077FF] text-white rounded-[10px] flex justify-center gap-[12px] items-center py-2'>
										<span>{gift.value}</span>
										<img src={tonIcon} alt='arrow-down' />
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Action buttons */}
				{showWithdraw && (
					<div className='fixed bottom-[20px] left-[20px] right-[20px] flex gap-[12px] z-50'>
						<Button
							onClick={handleSell}
							className='flex-1 bg-[#007AFF] text-white rounded-[12px] py-[15px] px-[20px] flex justify-center items-center gap-[8px] font-medium'
						>
							<span>Sell</span>
							<div className='flex items-center gap-[4px]'>
								<img src={tonIcon} alt='ton' className='w-[16px] h-[16px]' />
								<span>{totalValue}</span>
							</div>
						</Button>
						<button
							onClick={handleWithdraw}
							className='flex-1 bg-[#1B1E36] border border-[#2B2F53] text-[#fff] rounded-[12px] py-[15px] px-[20px] flex justify-center items-center gap-[8px] font-medium'
						>
							<span>Withdraw</span>
							<div className='flex items-center gap-[4px]'>
								<img src={tonIcon} alt='ton' className='w-[16px] h-[16px]' />
								<span>{totalValue}</span>
							</div>
						</button>
					</div>
				)}
			</div>

			{/* Sell Confirmation Modal */}
			{showSellModal && (
				<div
					className='fixed inset-0 flex items-center justify-center z-[9999] p-[20px]'
					style={{ zIndex: 9999 }}
				>
					{/* Backdrop with blur */}
					<div
						className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
						onClick={closeSellModal}
					></div>

					{/* Modal content */}
					<div className='bg-[#15182B] border border-[#2B334E] rounded-[20px] p-[30px] w-full max-w-[350px] relative z-10 mx-auto'>
						<button
							onClick={closeSellModal}
							className='absolute top-[35px] right-[20px] text-white text-[20px] hover:opacity-70 transition-opacity'
						>
							<img src={closeIcon} alt='close' className='w-[15px] h-[15px]' />
						</button>

						<div className='text-center'>
							<h2 className='text-white text-[20px] font-medium mb-[25px] leading-[28px]'>
								Are you sure you
								<br />
								want to sell?
							</h2>

							<div className='flex gap-[12px]'>
								<button
									onClick={confirmSell}
									className='flex-1 bg-[#0077FF] text-white rounded-[12px] py-[12px] px-[20px] font-medium hover:bg-[#0056CC] transition-colors'
								>
									Yes
								</button>
								<button
									onClick={closeSellModal}
									className='flex-1 bg-[#1B1E36] border border-[#2B2F53] text-white rounded-[12px] py-[12px] px-[20px] font-medium hover:bg-white hover:bg-opacity-10 transition-colors'
								>
									No
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default GiftsPage
