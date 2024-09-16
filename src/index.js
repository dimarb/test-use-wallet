import { NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import ReactDOM from 'react-dom/client'
import MyApp from './MyApp'
import SendAlgos from './SendAlgos'
// Create a manager instance
const walletManager = new WalletManager({
  wallets: [ WalletId.PERA ],
  network: NetworkId.TESTNET
})

function App() {
  return (
    // Provide the manager to your App
    <WalletProvider manager={walletManager}>
      <MyApp />
      <SendAlgos />
    </WalletProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)