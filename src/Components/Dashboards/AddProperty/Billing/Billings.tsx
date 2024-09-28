import React from 'react';
import ConnectWallet from './ConnectWallet';


interface BillingProps {
  
}

// Functional component with TypeScript
const Billings: React.FC<BillingProps> = () => {
  return (
    <div className="billingsdiv">
        <ConnectWallet />
      
    </div>
  );
};

export default Billings;