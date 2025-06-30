import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import ToolBar from './components/ToolBar/ToolBar'
import GiftsPage from './page/GiftsPage/GiftsPage'
import Jackpot from './page/Jackpot/Jackpot'
import BettingHistoryView from './page/Jackpot/views/BettingHistoryView'
import InventoryBetView from './page/Jackpot/views/InventoryBetView'
import Profile from './page/Profile/Profile'
import DepositView from './page/Profile/views/DepositView'
import HistoryView from './page/Profile/views/HistoryView'
import WithdrawView from './page/Profile/views/WithdrawView'
import Roulette from './page/Roulette/Roulette'
import Shop from './page/Shop/Shop'
import ShopItemDetail from './page/Shop/ShopItemDetail'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Navigate to='/jackpot' replace />} />
				<Route path='/jackpot' element={<Jackpot />} />
				<Route path='/jackpot/history' element={<BettingHistoryView />} />
				<Route path='/jackpot/inventory-bet' element={<InventoryBetView />} />
				<Route path='/roulette' element={<Roulette />} />
				<Route path='/gifts' element={<GiftsPage />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/shop/:id' element={<ShopItemDetail />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/profile/history' element={<HistoryView />} />
				<Route path='/profile/deposit' element={<DepositView />} />
				<Route path='/profile/withdraw' element={<WithdrawView />} />
			</Routes>
			<ToolBar />
		</>
	)
}

export default App
