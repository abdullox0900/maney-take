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
	const navigate = useNavigate()

	useEffect(() => {
		// For demo purposes, we can toggle between empty and filled state
		if (isEmpty) {
			setGifts([])
		} else {
			setGifts(initialGifts)
		}
	}, [isEmpty])

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
			<div className='pb-[150px]'>
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
				{/* Withdraw button */}
				{showWithdraw && (
					<div className='absolute bottom-[18%] left-[20px] right-[20px]'>
						<Button className='w-full flex justify-between items-center p-[30px]'>
							<span className='font-bold'>Withdraw</span>
							<div className='flex items-center gap-[12px]'>
								<img src={tonIcon} alt='arrow-down' />
								<span className='text-[16px]'>{totalValue}</span>
							</div>
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default GiftsPage
