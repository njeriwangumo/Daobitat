import ProgressBar from './ProgressBar'
import LoanCard from './LoanCard'
const Billings: React.FC = () => {
  // Progress bar data
  const progressData = {
    totalPaid: 4324,
    totalRemaining: 52524,
    nextInstallmentDate: 'hdh',
    nextInstallmentAmount: 54245,
    totalFinanced: 543534,
  };

  // Loan card data
  const loanCardData = {
    earnings: 221.00,
    totalBilled: 250.00,
    feesAndTaxes: 29.00,
    jobName: '3D animation for hero section of website.',
    feesDetails: '$25.00 fees + $4.00 tax',
    loanName: 'Home Renovation Loan',  // New property
    assetLien: 'Property at 123 Main St',  // New property
    interestRate: 3.5,  // New property
    openDate: 'Jan 15, 2022',  // New property
    maturityDate: 'Jan 15, 2027',  // New property
    terms: '5 years',  // New property
    balanceAmount: 10000.00,  // New property
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#181114] dark group/design-root overflow-x-hidden">
      {/* ... other components ... */}

      {/* Progress bar section */}
      <div className="flex justify-center items-center flex-col my-10">
        <h2 className="text-white text-lg font-bold mb-4">Billing Progress</h2>
        <ProgressBar {...progressData} />
      </div>

      {/* Loan card section */}
      <div className="flex justify-center items-center">
        <LoanCard
          earnings={loanCardData.earnings}
          totalBilled={loanCardData.totalBilled}
          feesAndTaxes={loanCardData.feesAndTaxes}
          jobName={loanCardData.jobName}
          feesDetails={loanCardData.feesDetails}
          loanName={loanCardData.loanName}             // New property
          assetLien={loanCardData.assetLien}           // New property
          interestRate={loanCardData.interestRate}     // New property
          openDate={loanCardData.openDate}             // New property
          maturityDate={loanCardData.maturityDate}     // New property
          terms={loanCardData.terms}                   // New property
          balanceAmount={loanCardData.balanceAmount}   // New property
        />
      </div>

      {/* ... other components ... */}
    </div>
  );
};

export default Billings;
