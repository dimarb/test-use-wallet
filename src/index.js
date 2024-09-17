import { NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Elections from './pages/Elections'
import './index.css';
import RegisterCandidate from './RegisterCandidate'
// Create a manager instance
const walletManager = new WalletManager({
  wallets: [ WalletId.PERA ],
  network: NetworkId.TESTNET
})

function App() {
  return (
    // Provide the manager to your App
    <WalletProvider manager={walletManager}>
      <Router>
        <Header />
          <Routes>
            <Route path='/' element={<Elections/>} />
            <Route path='/RegisterCandidate' element={<RegisterCandidate/>} />
          </Routes>
      </Router>
      
    </WalletProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)