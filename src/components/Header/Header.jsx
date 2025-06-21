import addIcon from '../../assets/icon/add-icon.svg'
import tonIcon from '../../assets/icon/ton-icon.svg'
import logo from '../../assets/logo.svg'

const Header = () => {
	return (
		<header className='flex justify-between items-center py-[30px] px-[20px] border-b border-[#1F233C] mb-[25px]'>
			<img src={logo} alt='logo' className='w-[100px] h-[42px]' />

			<button className='flex items-center gap-[12px] p-[12px] bg-[#0A65CD] rounded-[10px]'>
				<img src={tonIcon} alt='ton' className='w-[20px] h-[20px]' />
				<span className='text-[18px] uppercase text-white'>0 TON</span>
				<img src={addIcon} alt='add' className='w-[20px] h-[20px]' />
			</button>
		</header>
	)
}

export default Header
