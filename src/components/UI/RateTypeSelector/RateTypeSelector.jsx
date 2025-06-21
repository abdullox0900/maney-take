import { useState } from 'react'
import checkIcon from '../../../assets/icon/check.svg'
import './RateTypeSelector.css'

const RateTypeSelector = ({ onChange }) => {
	const [activeType, setActiveType] = useState('balance')

	const handleTypeChange = type => {
		setActiveType(type)
		if (onChange) onChange(type)
	}

	return (
		<div className=''>
			<div className='flex items-center mb-[25px] gap-[6px]'>
				<img src={checkIcon} alt='' />
				<h3 className='text-white text-[21px] font-medium'>Select Rate Type</h3>
			</div>
			<div className='flex bg-[rgba(25,27,49,0.4)] h-[80px] border border-[#2B2F53] rounded-[12px] overflow-hidden'>
				<button
					className={`flex-1 flex items-center justify-center gap-[12px] border-none cursor-pointer transition-all duration-200 ${
						activeType === 'balance'
							? 'rate-type-selector-active'
							: 'bg-transparent text-[#8A99BD]'
					}`}
					onClick={() => handleTypeChange('balance')}
				>
					<svg
						width={24}
						height={24}
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M21.45 13.64V14.64C21.45 14.91 21.24 15.13 20.96 15.14H19.5C18.97 15.14 18.49 14.75 18.45 14.23C18.42 13.92 18.54 13.63 18.74 13.43C18.92 13.24 19.17 13.14 19.44 13.14H20.95C21.24 13.15 21.45 13.37 21.45 13.64Z'
							fill='currentColor'
						/>
						<path
							d='M17.99 12.69C17.49 13.18 17.25 13.91 17.45 14.67C17.71 15.6 18.62 16.19 19.58 16.19H20.45C21 16.19 21.45 16.64 21.45 17.19V17.38C21.45 19.45 19.76 21.14 17.69 21.14H6.20995C4.13995 21.14 2.44995 19.45 2.44995 17.38V10.65C2.44995 9.42001 3.03995 8.33001 3.94995 7.65001C4.57995 7.17001 5.35995 6.89001 6.20995 6.89001H17.69C19.76 6.89001 21.45 8.58001 21.45 10.65V11.09C21.45 11.64 21 12.09 20.45 12.09H19.43C18.87 12.09 18.36 12.31 17.99 12.69Z'
							fill='currentColor'
						/>
						<path
							d='M16.2001 4.82C16.4701 5.09 16.2401 5.51 15.8601 5.51L8.18006 5.5C7.74006 5.5 7.51006 4.96 7.83006 4.65L9.45006 3.02C10.8201 1.66 13.0401 1.66 14.4101 3.02L16.1601 4.79C16.1701 4.8 16.1901 4.81 16.2001 4.82Z'
							fill='currentColor'
						/>
					</svg>

					<span className='text-[16px]'>Balance</span>
				</button>
				<button
					className={`flex-1 flex items-center justify-center gap-[12px] border-none cursor-pointer transition-all duration-200 ${
						activeType === 'inventory'
							? 'rate-type-selector-active'
							: 'bg-transparent text-[#8A99BD]'
					}`}
					onClick={() => handleTypeChange('inventory')}
				>
					<svg
						width={24}
						height={24}
						viewBox='0 0 24 24'
						fill='currentColor'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M20.21 7.81994L12.51 12.2799C12.2 12.4599 11.81 12.4599 11.49 12.2799L3.78997 7.81994C3.23997 7.49994 3.09997 6.74994 3.51997 6.27994C3.80997 5.94994 4.13997 5.67994 4.48997 5.48994L9.90997 2.48994C11.07 1.83994 12.95 1.83994 14.11 2.48994L19.53 5.48994C19.88 5.67994 20.21 5.95994 20.5 6.27994C20.9 6.74994 20.76 7.49994 20.21 7.81994Z'
							fill='currentColor'
						/>
						<path
							d='M11.43 14.14V20.96C11.43 21.72 10.66 22.22 9.97998 21.89C7.91998 20.88 4.44998 18.99 4.44998 18.99C3.22998 18.3 2.22998 16.56 2.22998 15.13V9.97C2.22998 9.18 3.05998 8.68 3.73998 9.07L10.93 13.24C11.23 13.43 11.43 13.77 11.43 14.14Z'
							fill='currentColor'
						/>
						<path
							d='M12.5699 14.14V20.96C12.5699 21.72 13.3399 22.22 14.0199 21.89C16.0799 20.88 19.5499 18.99 19.5499 18.99C20.7699 18.3 21.7699 16.56 21.7699 15.13V9.97C21.7699 9.18 20.9399 8.68 20.2599 9.07L13.0699 13.24C12.7699 13.43 12.5699 13.77 12.5699 14.14Z'
							fill='currentColor'
						/>
					</svg>

					<span className='text-base'>Inventory</span>
				</button>
			</div>
		</div>
	)
}

export default RateTypeSelector
