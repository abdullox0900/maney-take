import { Link, useLocation } from 'react-router-dom'
import { tools } from '../../data/toolbar'
import './ToolBar.css'

const ToolBar = () => {
	const location = useLocation()
	const currentPath = location.pathname

	// Check if the current path is a sub-route of a main route
	const isSubRoute = (mainPath, currentPath) => {
		return currentPath.startsWith(mainPath + '/')
	}

	// Determine which tool is active based on the current path
	const getActiveToolPath = () => {
		// Check for shop detail page (/shop/123)
		if (currentPath.match(/^\/shop\/\d+$/)) {
			return '/shop'
		}

		// Check for jackpot sub-routes
		if (isSubRoute('/jackpot', currentPath)) {
			return '/jackpot'
		}

		// Default: use exact path matching
		return currentPath
	}

	const activeToolPath = getActiveToolPath()

	return (
		<div className=' bottom-0 left-0 w-full flex justify-center items-center gap-[12px] py-[18px] px-[20px] tool-bar-bg z-50'>
			<div className='flex items-center justify-between w-full max-w-[500px]'>
				{tools.map(tool => {
					const isActive = activeToolPath === tool.path
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
