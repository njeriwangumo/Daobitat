import React from 'react';
import { CSSProperties } from 'react';
import FinancingHeader from './FinancingHeader';
import LoanDetails from './LoanDetails';


const customStyles: CSSProperties = {
  ['--select-button-svg' as string]: "url('data:image/svg+xml...",
  fontFamily: '"Public Sans", "Noto Sans", sans-serif'
};
const FinancingDashboard: React.FC = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#181114] dark group/design-root overflow-x-hidden"
      style={customStyles}
    >
      <FinancingHeader />
      <LoanDetails />
      
    </div>
  );
};

export default FinancingDashboard;
