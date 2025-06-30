import { useState } from 'react'
import ProfileView from './views/ProfileView'

const Profile = () => {
	const [isConnecting, setIsConnecting] = useState(false)
	const [walletAddress, setWalletAddress] = useState(null)

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
			<ProfileView
				walletAddress={walletAddress}
				isConnecting={isConnecting}
				onConnectWallet={handleConnectWallet}
			/>
		</div>
	)
}

export default Profile
