// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React, { FC } from 'react';
import './App.css'
import {TokenLaunchpad} from './components/TokenLaunchpad' ;
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  
  return (
    <>
   <ConnectionProvider  endpoint={"https://api.devnet.solana.com"}>
    <WalletProvider wallets={[]} autoconnect>
      <WalletModalProvider>
    <div style={{
     display:'flex',
     justifyContent: 'center',
     padding: 20,
     gap:'70vw',
     
    }}>
      <WalletMultiButton />
      <WalletDisconnectButton />
    </div>
    <TokenLaunchpad></TokenLaunchpad> 
      </WalletModalProvider>
    </WalletProvider>
   </ConnectionProvider>

    </>
  )
}

export default App
