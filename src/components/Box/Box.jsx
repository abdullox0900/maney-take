import React from 'react'
import boxIcon from '../../assets/icon/box.svg'
import closeIcon from '../../assets/icon/close-icon.svg'

const Box = ({
	children,
	title,
	subtitle,
	onClose,
	showEmptyState = false,
	className,
}) => {
	return (
		<div
			className={`flex flex-col z-50 pt-[33px] px-[20px] h-screen border border-[#2B2F53] rounded-t-[52px] border-b-0 gifts-page max-[390px]:px-[20px] ${className}`}
		>
			{/* Header */}
			<div className='flex justify-center items-center mb-[25px] relative'>
				<div className='flex flex-col items-center gap-[12px]'>
					<h1 className='text-white text-xl font-medium text-center'>
						{title}
					</h1>
					{subtitle && (
						<p className='text-[16px] font-regular text-center text-[#8a99bd]'>
							{subtitle}
						</p>
					)}
				</div>
				{onClose && (
					<button
						onClick={onClose}
						className='text-white text-2xl absolute right-[10px] top-[2px]'
					>
						<img src={closeIcon} alt='close' className='w-[18px] h-[18px]' />
					</button>
				)}
			</div>

			{/* Content */}
			<div className='pb-[150px]'>
				{showEmptyState ? (
					// Empty state
					<div className='h-[calc(100vh-300px)] flex flex-col items-center justify-center'>
						<img src={boxIcon} alt='empty-state' />
					</div>
				) : (
					// Content
					<div>{children}</div>
				)}
			</div>
		</div>
	)
}

export default Box
