import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import ToolBar from './components/ToolBar/ToolBar'
import GiftsPage from './page/GiftsPage/GiftsPage'
import Jackpot from './page/Jackpot/Jackpot'
import Roulette from './page/Roulette/Roulette'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Navigate to='/jackpot' replace />} />
				<Route path='/jackpot' element={<Jackpot />} />
				<Route path='/roulette' element={<Roulette />} />
				<Route path='/gifts' element={<GiftsPage />} />
				<Route path='/shop' element={<div className='p-4'>Shop Page</div>} />
				<Route
					path='/profile'
					element={<div className='p-4'>Profile Page</div>}
				/>
			</Routes>
			<ToolBar />
		</>
	)
}

export default App
