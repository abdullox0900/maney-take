import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import tonIcon from '../../assets/icon/ton-icon.svg'
import Box from '../../components/Box/Box'
import { shopItems } from '../../data/shop-items'
import './Shop.css'

const ShopItemDetail = () => {
	const { id } = useParams()
	const [item, setItem] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		// Find the item with the matching ID
		const foundItem = shopItems.find(item => item.id.toString() === id)
		if (foundItem) {
			setItem(foundItem)
		} else {
			// If no matching item is found, navigate back to the shop
			navigate('/shop')
		}
	}, [id, navigate])

	if (!item) {
		return <div className='text-white text-center py-10'>Loading...</div>
	}

	return (
		<Box
			title='Gift'
			subtitle={`Buying a gift`}
			onClose={() => navigate('/shop')}
		>
			<div className='pb-[150px]'>
				<div className='p-[20px] bg-[#151828] rounded-[20px] border border-[#1F233C]'>
					<div className='h-[335px] w-full rounded-[10px] mb-[25px] overflow-hidden'>
						<img
							src={item.image}
							alt={item.name}
							className='w-full h-full object-cover'
						/>
					</div>

					<div className='flex justify-between items-center mb-[25px]'>
						<h2 className='text-white text-[21px] font-medium'>{item.name}</h2>
						<p className='text-[#A3A3A3] text-[16px]'>#{item.id}</p>
					</div>

					<button className='w-full flex justify-center items-center gap-[11px] bg-[#0077FF] py-[19px] rounded-[10px] text-white'>
						<img src={tonIcon} alt='ton' className='w-[21px] h-[21px]' />
						<span className='font-medium text-[21px]'>{item.price}</span>
					</button>
				</div>
			</div>
		</Box>
	)
}

export default ShopItemDetail
