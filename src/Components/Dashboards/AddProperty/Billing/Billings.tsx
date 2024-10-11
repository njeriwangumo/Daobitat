import React from 'react';
import ConnectWallet from './ConnectWallet';
import ConnectBaseSmartWallet from './ConnectSmartWallet';
import ConnectYourWallet from './ConnectYourWallet';


interface BillingProps {
  
}

// Functional component with TypeScript
const Billings: React.FC<BillingProps> = () => {
  return (
    <div className="billingsdiv">
      
        <ConnectYourWallet />
      
    </div>
  );
};

export default Billings;