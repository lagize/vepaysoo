import { useEffect, useState } from 'react';
import { useContractContext } from '../contexts/ContractContext';

export default function Home() {
  const { contract } = useContractContext();
  const [loading, setLoading] = useState(true);

  const produceProduct = async () => {
    try {
      if (!contract) return;
      // Call the produceProduct function on the contract
      // Pass the required parameters if any
      // Example: await contract.produceProduct(productId, uniqueId, manufacturer, details);
      alert('Product produced successfully!');
    } catch (error) {
      console.error('Error producing product:', error);
    }
  };

  const verifyProduct = async () => {
    try {
      if (!contract) return;
      // Call the verifyProduct function on the contract
      // Pass the required parameters if any
      // Example: await contract.verifyProduct(productId, quantity, quality, isConfirmed);
      alert('Product verified successfully!');
    } catch (error) {
      console.error('Error verifying product:', error);
    }
  };

  const sellProduct = async () => {
    try {
      if (!contract) return;
      // Call the sellProduct function on the contract
      // Pass the required parameters if any
      // Example: await contract.sellProduct(productId);
      alert('Product sold successfully!');
    } catch (error) {
      console.error('Error selling product:', error);
    }
  };

  const acceptReturn = async () => {
    try {
      if (!contract) return;
      // Call the acceptReturn function on the contract
      // Pass the required parameters if any
      // Example: await contract.acceptReturn(productId);
      alert('Return accepted successfully!');
    } catch (error) {
      console.error('Error accepting return:', error);
    }
  };

  useEffect(() => {
    if (contract) setLoading(false);
  }, [contract]);

  return (
    <div className="screen">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <button className="button" onClick={produceProduct}>
            Produce Product
          </button>
          <button className="button" onClick={verifyProduct}>
            Verify Product
          </button>
          <button className="button" onClick={sellProduct}>
            Sell Product
          </button>
          <button className="button" onClick={acceptReturn}>
            Accept Return
          </button>
          {/* Add other contract functions */}
        </div>
      )}
    </div>
  );
}
