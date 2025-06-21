import { Link, useLocation } from 'react-router-dom'
import { tools } from '../../data/toolbar'
import './ToolBar.css'

const ToolBar = () => {
	const location = useLocation()
	const currentPath = location.pathname

	return (
		<div className='fixed bottom-0 left-0 w-full flex justify-center items-center gap-[12px] py-[18px] px-[20px] tool-bar-bg'>
			<div className='flex items-center justify-between w-full max-w-[500px]'>
				{tools.map(tool => {
					const isActive = currentPath === tool.path
					return (
						<Link
							to={tool.path}
							key={tool.id}
							className='flex flex-col items-center gap-[12px]'
						>
							<div
								className={`w-[60px] h-[60px] rounded-[12px] flex items-center justify-center border ${
									isActive
										? 'text-[#00FFD7] active-tool-bar border-transparent'
										: 'bg-[#1B1E36] border-[#222643] text-[#8A99BD]'
								}`}
							>
								<div>{tool.icon}</div>
							</div>
							<span
								className={`text-[14px] ${
									isActive ? 'text-white' : 'text-[#8A99BD]'
								}`}
							>
								{tool.name}
							</span>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

export default ToolBar
