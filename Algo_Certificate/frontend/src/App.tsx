import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders, useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { SnackbarProvider } from 'notistack'
import { useState } from 'react'
import AppCalls from './components/AppCalls'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

import { connectAlgoSigner } from 'algosignerjs'

let providersArray: ProvidersArray
if (import.meta.env.VITE_ALGOD_NETWORK === '') {
  providersArray = [{ id: PROVIDER_ID.KMD }]
} else {
  providersArray = [
    { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
    { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
    { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
    { id: PROVIDER_ID.EXODUS },
    // If you are interested in WalletConnect v2 provider
    // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
  ]
}

export default function App() {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal)
  }

  const toggleAppCallsModal = () => {
    setAppCallsDemoModal(!appCallsDemoModal)
  }

  const algodConfig = getAlgodConfigFromViteEnvironment()

  const walletProviders = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    algosdkStatic: algosdk,
  })

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider value={walletProviders}>
        <div className="hero min-h-screen bg-teal-400">
          <div className="hero-content text-center rounded-lg p-6 max-w-md bg-white mx-auto">
            <div className="max-w-md">
              <h1 className="text-4xl">
                Welcome to <div className="font-bold">AlgoKit 🙂</div>
              </h1>
              <p className="py-6">
                This starter has been generated using official AlgoKit React template. Refer to the resource below for next steps.
              </p>

              <div className="grid">
                <a
                  data-test-id="getting-started"
                  className="btn btn-primary m-2"
                  target="_blank"
                  href="https://github.com/algorandfoundation/algokit-cli"
                >
                  Getting started
                </a>

                <div className="divider" />
                <button data-test-id="connect-wallet" className="btn m-2" onClick={toggleWalletModal}>
                  Wallet Connection
                </button>

                {activeAddress && (
                  <button data-test-id="transactions-demo" className="btn m-2" onClick={toggleDemoModal}>
                    Transactions Demo
                  </button>
                )}

                {activeAddress && (
                  <button data-test-id="appcalls-demo" className="btn m-2" onClick={toggleAppCallsModal}>
                    Contract Interactions Demo
                  </button>
                )}
              </div>

              <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
              <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
              <AppCalls openModal={appCallsDemoModal} setModalState={setAppCallsDemoModal} />
            </div>
          </div>
        </div>
      </WalletProvider>
    </SnackbarProvider>
  )
}

function WalletConnect() {
  const { connect, connected, address } = connectAlgoSigner()

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Connection error:', error)
    }
  }

  const optInForNFT = async () => {
    try {
      // Assuming you have a method named `optIn` on your smart contract
      // that takes a public key as an argument
      const txId = await myContract.methods.optIn(address).send()
      console.log(`Transaction ID: ${txId}`)
    } catch (error) {
      console.error('Error opting in for NFT:', error)
    }
  }

  return (
    <div>
      {connected ? (
        <>
          Connected to address: {address}
          <button onClick={optInForNFT}>Opt-in for NFT</button>
        </>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  )
}

export default WalletConnect

const [nftName, setNftName] = useState('')
const [nftDescription, setNftDescription] = useState('')

const handleSubmit = (event) => {
  event.preventDefault()
  // TODO: Call the API to create the NFT
}

return (
  <div>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={nftName} onChange={(e) => setNftName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={nftDescription} onChange={(e) => setNftDescription(e.target.value)} />
      </label>
      <input type="submit" value="Create NFT" />
    </form>
  </div>
)
