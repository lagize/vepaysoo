import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ContractContext = createContext();

export const useContractContext = () => {
  return useContext(ContractContext);
};

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        // Connect to an Ethereum provider (e.g., MetaMask)
        const ethereumProvider = window.ethereum;
        await ethereumProvider.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(ethereumProvider);
        setProvider(provider);

        // Get the signer
        const signer = provider.getSigner();

        // Replace `YourContractABI` with your actual contract ABI and `YourContractAddress` with your actual contract address
        const contractABI = [
          {
            "type": "event",
            "name": "ProductAuthenticity",
            "inputs": [
              {
                "type": "uint256",
                "name": "productId",
                "indexed": true,
                "internalType": "uint256"
              },
              {
                "type": "bool",
                "name": "isAuthentic",
                "indexed": false,
                "internalType": "bool"
              }
            ],
            "outputs": [],
            "anonymous": false
          },
          // Other ABI entries
          // ...
        ];

        const contractAddress = '0x629a9216Bdd79180a1dE84b90FEDcC33b390F934'; // Your provided contract address

        // Create the contract instance
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contractInstance);
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };

    initializeContract();
  }, []);

  const contextValue = {
    provider,
    contract,
  };

  return (
    <ContractContext.Provider value={contextValue}>{children}</ContractContext.Provider>
  );
};
