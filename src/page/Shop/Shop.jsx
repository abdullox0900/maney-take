import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tonIcon from '../../assets/icon/ton-icon.svg'
import { shopItems as initialShopItems } from '../../data/shop-items'
import './Shop.css'

const sortOptions = [
	{ value: 'default', label: 'Default' },
	{ value: 'price-low', label: 'Price: Low to High' },
	{ value: 'price-high', label: 'Price: High to Low' },
	{ value: 'name', label: 'Name (A-Z)' },
]

const Shop = () => {
	const [shopItems, setShopItems] = useState(initialShopItems)
	const [searchQuery, setSearchQuery] = useState('')
	const [showSortDropdown, setShowSortDropdown] = useState(false)
	const [sortBy, setSortBy] = useState('default')
	const navigate = useNavigate()
	const dropdownRef = useRef(null)

	const goToItemDetail = item => {
		navigate(`/shop/${item.id}`)
	}

	const handleSearch = e => {
		const query = e.target.value
		setSearchQuery(query)
		applySort(query, sortBy)
	}

	const applySort = (query, sortValue) => {
		let filtered = [...initialShopItems]
		if (query.trim() !== '') {
			filtered = filtered.filter(
				item =>
					item.id.toString().includes(query) ||
					item.name.toLowerCase().includes(query.toLowerCase())
			)
		}
		switch (sortValue) {
			case 'price-low':
				filtered.sort((a, b) => a.price - b.price)
				break
			case 'price-high':
				filtered.sort((a, b) => b.price - a.price)
				break
			case 'name':
				filtered.sort((a, b) => a.name.localeCompare(b.name))
				break
			default:
				break
		}
		setShopItems(filtered)
	}

	const handleSortSelect = value => {
		setSortBy(value)
		setShowSortDropdown(false)
		applySort(searchQuery, value)
	}

	return (
		<div className='flex flex-col px-[20px]'>
			{/* Header */}
			<div className='flex flex-col justify-start items-start mb-[25px] relative'>
				<div className='flex items-center gap-[8px] mb-[6px]'>
					<svg
						width={24}
						height={25}
						viewBox='0 0 24 25'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M21.75 18.5C21.75 21.1234 19.6234 23.25 17 23.25H7C4.37665 23.25 2.25 21.1234 2.25 18.5V8.25H21.75V18.5ZM16 10.75C15.5858 10.75 15.25 11.0858 15.25 11.5C15.25 12.6297 14.8339 13.4221 14.252 13.9395C13.6561 14.4691 12.8402 14.75 12 14.75C11.1598 14.75 10.3439 14.4691 9.74805 13.9395C9.16606 13.4221 8.75 12.6297 8.75 11.5C8.75 11.0858 8.41421 10.75 8 10.75C7.58579 10.75 7.25 11.0858 7.25 11.5C7.25 13.0369 7.834 14.2446 8.75195 15.0605C9.65609 15.8642 10.8402 16.25 12 16.25C13.1598 16.25 14.3439 15.8642 15.248 15.0605C16.166 14.2446 16.75 13.0369 16.75 11.5C16.75 11.0858 16.4142 10.75 16 10.75ZM15.6846 2.75C17.0543 2.75 18.3578 3.34125 19.2598 4.37207L21.3408 6.75H2.65918L4.74023 4.37207L4.91406 4.18359C5.80542 3.26939 7.03141 2.75 8.31543 2.75H15.6846Z'
							fill='white'
						/>
					</svg>
					<h1 className='text-white text-[24px] font-medium'>Shop</h1>
				</div>
				<p className='text-[#8a99bd] text-[16px] font-regular'>
					Check out the products
				</p>
			</div>

			{/* Search & Sort */}
			<div className='flex items-center justify-between gap-[20px] mb-[25px] relative'>
				<div className='relative w-full'>
					<input
						type='text'
						placeholder='Search ID'
						className='w-full bg-[#1B1E36] text-white py-3 px-10 rounded-xl border border-[#2B334E] focus:outline-none'
						value={searchQuery}
						onChange={handleSearch}
					/>
					<svg
						className='absolute left-3 top-1/2 transform -translate-y-1/2'
						width={20}
						height={21}
						viewBox='0 0 20 21'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M9.16699 1.10986C13.7232 1.11004 17.417 4.80362 17.417 9.35986C17.4169 11.3679 16.6984 13.2076 15.5059 14.6382L18.4463 17.5786L18.498 17.6362C18.7382 17.9308 18.7208 18.3646 18.4463 18.6392C18.1718 18.9137 17.7379 18.931 17.4434 18.6909L17.3857 18.6392L14.4453 15.6987C13.0148 16.8912 11.175 17.6098 9.16699 17.6099C4.61075 17.6099 0.917168 13.9161 0.916992 9.35986C0.916992 4.80351 4.61064 1.10986 9.16699 1.10986ZM9.16699 2.60986C5.43907 2.60986 2.41699 5.63194 2.41699 9.35986C2.41717 13.0876 5.43918 16.1099 9.16699 16.1099C12.8947 16.1097 15.9168 13.0875 15.917 9.35986C15.917 5.63205 12.8948 2.61004 9.16699 2.60986ZM9.16699 5.19287C11.468 5.19305 13.333 7.05879 13.333 9.35986C13.3328 11.6608 11.4679 13.5257 9.16699 13.5259C6.86591 13.5259 5.00018 11.6609 5 9.35986C5 7.05868 6.86581 5.19287 9.16699 5.19287Z'
							fill='#8A99BD'
						/>
					</svg>
				</div>
				<div className='relative'>
					<button
						onClick={() => setShowSortDropdown(v => !v)}
						className='flex items-center justify-center w-[50px] h-[50px] new-shadow hover:opacity-80 transition-opacity'
					>
						<svg
							width={25}
							height={25}
							viewBox='0 0 25 25'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16.383 2.19287H8.00299C4.36299 2.19287 2.19299 4.36287 2.19299 8.00287V16.3729C2.19299 20.0229 4.36299 22.1929 8.00299 22.1929H16.373C20.013 22.1929 22.183 20.0229 22.183 16.3829V8.00287C22.193 4.36287 20.023 2.19287 16.383 2.19287ZM11.123 17.3429C11.123 17.4429 11.103 17.5329 11.063 17.6329C10.983 17.8129 10.843 17.9629 10.653 18.0429C10.563 18.0829 10.463 18.1029 10.363 18.1029C10.263 18.1029 10.173 18.0829 10.073 18.0429C9.98299 18.0029 9.90299 17.9529 9.83299 17.8829L6.79299 14.8429C6.50299 14.5529 6.50299 14.0729 6.79299 13.7829C7.08299 13.4929 7.56299 13.4929 7.85299 13.7829L9.61299 15.5429V7.04287C9.61299 6.63287 9.95299 6.29287 10.363 6.29287C10.773 6.29287 11.113 6.63287 11.113 7.04287V17.3429H11.123ZM17.583 10.6129C17.433 10.7629 17.243 10.8329 17.053 10.8329C16.863 10.8329 16.673 10.7629 16.523 10.6129L14.763 8.85287V17.3529C14.763 17.7629 14.423 18.1029 14.013 18.1029C13.603 18.1029 13.263 17.7629 13.263 17.3529V7.04287C13.263 6.94287 13.283 6.85287 13.323 6.75287C13.403 6.57287 13.543 6.42287 13.733 6.34287C13.913 6.26287 14.123 6.26287 14.303 6.34287C14.393 6.38287 14.473 6.43287 14.543 6.50287L17.583 9.54287C17.873 9.84287 17.873 10.3129 17.583 10.6129Z'
								fill='white'
							/>
						</svg>
					</button>
					{showSortDropdown && (
						<div
							ref={dropdownRef}
							className='absolute right-0 mt-2 w-[180px] bg-[#181B2E] border border-[#2B334E] rounded-[12px] shadow-lg z-20'
						>
							{sortOptions.map(option => (
								<button
									key={option.value}
									onClick={() => handleSortSelect(option.value)}
									className={`w-full text-left px-4 py-3 text-white hover:bg-[#232843] rounded-[12px] transition-colors ${
										sortBy === option.value ? 'bg-[#232843]' : ''
									}`}
								>
									{option.label}
								</button>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Shop Items Grid */}
			<div className='grid grid-cols-2 gap-[20px] max-[390px]:gap-[15px] pb-[50px]'>
				{shopItems.map((item, index) => (
					<div
						key={index}
						className='shop-item rounded-[10px] overflow-hidden cursor-pointer px-[8px] py-[13px]'
						onClick={() => goToItemDetail(item)}
					>
						<div className='w-full h-[170px] mb-[13px] rounded-[10px] overflow-hidden'>
							<img
								src={item.image}
								alt={item.name}
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='bg-[rgba(27,30,54,0.56)]'>
							<p className='text-white text-[16px] mb-[13px]'>{item.name}</p>
							<p className='text-[#8a99bd] text-[14px] mb-[13px]'>#{item.id}</p>
							<div className='flex items-center justify-between w-full gap-[17px]'>
								<div className='w-full bg-[#0077FF] text-white rounded-[10px] flex justify-center items-center py-[13px] px-[13px] gap-[13px]'>
									<span>{item.price}</span>
									<img src={tonIcon} alt='ton' />
								</div>
								<button className='new-shadow'>
									<svg
										width={23}
										height={23}
										viewBox='0 0 23 23'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M18.4636 6.07689H18.0971L15.0004 2.9802C14.753 2.73284 14.3499 2.73284 14.0934 2.9802C13.846 3.22757 13.846 3.63069 14.0934 3.88722L16.2831 6.07689H7.3778L9.56747 3.88722C9.81484 3.63985 9.81484 3.23673 9.56747 2.9802C9.3201 2.73284 8.91698 2.73284 8.66045 2.9802L5.57293 6.07689H5.20646C4.3819 6.07689 2.66864 6.07689 2.66864 8.42231C2.66864 9.311 2.85188 9.89736 3.23667 10.2822C3.45655 10.5112 3.72225 10.6303 4.00626 10.6944C4.27195 10.7586 4.55597 10.7677 4.83082 10.7677H18.83C19.1141 10.7677 19.3798 10.7494 19.6363 10.6944C20.4059 10.5112 20.9922 9.96149 20.9922 8.42231C20.9922 6.07689 19.279 6.07689 18.4636 6.07689Z'
											fill='white'
										/>
										<path
											d='M18.2894 11.9587H5.29801C4.72998 11.9587 4.29937 12.4626 4.39099 13.0215L5.16058 17.7307C5.41711 19.3065 6.10425 21.1205 9.15512 21.1205H14.2949C17.3824 21.1205 17.9321 19.5722 18.2619 17.8406L19.1873 13.049C19.2972 12.481 18.8666 11.9587 18.2894 11.9587ZM10.5569 17.8681C10.5569 18.2254 10.2729 18.5094 9.92471 18.5094C9.5674 18.5094 9.28339 18.2254 9.28339 17.8681V14.8447C9.28339 14.4966 9.5674 14.2034 9.92471 14.2034C10.2729 14.2034 10.5569 14.4966 10.5569 14.8447V17.8681ZM14.4781 17.8681C14.4781 18.2254 14.1941 18.5094 13.8368 18.5094C13.4887 18.5094 13.1955 18.2254 13.1955 17.8681V14.8447C13.1955 14.4966 13.4887 14.2034 13.8368 14.2034C14.1941 14.2034 14.4781 14.4966 14.4781 14.8447V17.8681Z'
											fill='white'
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Shop
