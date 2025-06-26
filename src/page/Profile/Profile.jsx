import { useState } from 'react'

// Import view components
import DepositView from './views/DepositView'
import HistoryView from './views/HistoryView'
import ProfileView from './views/ProfileView'
import WithdrawView from './views/WithdrawView'

const Profile = () => {
	const [isConnecting, setIsConnecting] = useState(false)
	const [walletAddress, setWalletAddress] = useState(null)

	// Active section state
	const [activeSection, setActiveSection] = useState('profile') // 'profile', 'history', 'withdraw', 'deposit'

	const handleConnectWallet = () => {
		setIsConnecting(true)

		// Simulate connection process
		setTimeout(() => {
			setIsConnecting(false)
			setWalletAddress('0xhsg...hshsfeewfqff')
		}, 1500)
	}

	return (
		<div>
			{/* Content sections */}
			{activeSection === 'profile' && (
				<ProfileView
					walletAddress={walletAddress}
					isConnecting={isConnecting}
					onConnectWallet={handleConnectWallet}
					onNavigate={setActiveSection}
				/>
			)}

			{activeSection === 'history' && <HistoryView />}

			{activeSection === 'withdraw' && <WithdrawView />}

			{activeSection === 'deposit' && <DepositView />}
		</div>
	)
}

export default Profile
