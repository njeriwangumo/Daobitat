import React, { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

const ConnectWallet: React.FC = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  // Function to handle wallet connection
  const connectWallet = async () => {
    try {
      // Create a new instance of Web3Modal
      const web3Modal = new Web3Modal();

      // Connect to the wallet
      const instance = await web3Modal.connect();

      // Use the 'Web3Provider' class in ethers v5
      const ethersProvider = new ethers.providers.Web3Provider(instance);
      setProvider(ethersProvider);

      // Get the signer (connected account)
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      console.log("Connected Wallet:", address);
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
