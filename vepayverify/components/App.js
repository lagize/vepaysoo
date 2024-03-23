import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'; // Import ethers.js library
import { useContractContext } from '../contexts/ContractContext';

function App() {
  const { provider } = useContractContext(); // Access provider from custom context
  const [contract, setContract] = useState(null); // State to hold contract instance
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    if (provider) {
      // Define contract address and ABI
      const contractAddress = '0x629a9216Bdd79180a1dE84b90FEDcC33b390F934';
      const abi = [
        // Contract ABI here
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
        // other ABI entries
        // ...
      ];

      // Get the signer from the provider
      const signer = provider.getSigner();
      
      // Create a new instance of the contract using ethers.js
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      
      // Set the contract instance in state and update loading state
      setContract(contractInstance);
      setLoading(false);
    }
  }, [provider]);

  // Function to produce a product by interacting with the contract
  const produceProduct = async () => {
    try {
      if (!contract) return;

      // Call the produceProduct function on the contract
      // Example: await contract.produceProduct(productId, uniqueId, manufacturer, details);
      alert('Product produced successfully!');
    } catch (error) {
      console.error('Error producing product:', error);
    }
  };

  // Render the component with a button to call the produceProduct function
  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Button to call the produceProduct function */}
          <button className="button" onClick={produceProduct}>
            Produce Product
          </button>
          {/* Add other contract functions */}
        </div>
      )}
    </div>
  );
}

export default App;
