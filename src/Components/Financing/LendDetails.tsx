import React, { useState } from 'react';

// Boilerplate components (you would replace these with actual implementations)
const ProgressBar: React.FC = () => <div>Progress Bar Component</div>;
const LoanCard: React.FC = () => <div>Loan Card Component</div>;

// Replace with the actual UI components when available
const Slider: React.FC<{ value: number[]; onValueChange: (value: number[]) => void }> = ({ value, onValueChange }) => (
  <input
    type="range"
    value={value[0]}
    onChange={(e) => onValueChange([+e.target.value])}
    min={0}
    max={10000}
    step={100}
  />
);

const Calendar: React.FC<{ selected?: Date; onSelect: (date: Date | undefined) => void }> = ({ selected, onSelect }) => (
  <input
    type="date"
    value={selected ? selected.toISOString().substring(0, 10) : ''}
    onChange={(e) => onSelect(e.target.value ? new Date(e.target.value) : undefined)}
  />
);

const Select: React.FC<{ value: string; onValueChange: (value: string) => void }> = ({ value, onValueChange }) => (
  <select value={value} onChange={(e) => onValueChange(e.target.value)}>
    <option value="balance">Balance</option>
    <option value="repaymentDate">Repayment Date</option>
  </select>
);

const LendDetails: React.FC = () => {
  const [balanceFilter, setBalanceFilter] = useState<number>(0);
  const [repaymentDateFilter, setRepaymentDateFilter] = useState<Date | undefined>(undefined);
  const [applicationDateFilter, setApplicationDateFilter] = useState<Date | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>('balance');

  // Sample loan data (you would replace this with real data)
  const loans = [
    {
      id: 1,
      loanName: 'Consumer Loan',
      balanceAmount: 1000.00,
      payed: 100.00,
      nextPayment: 80.00,
      nextPaymentDate: new Date('2024-07-17'),
      applicationDate: new Date('2023-03-17'),
    },
    // Add more loans as needed...
  ];

  // Filter and sort loans
  const filteredLoans = loans
    .filter((loan) => loan.balanceAmount >= balanceFilter)
    .filter((loan) => !repaymentDateFilter || loan.nextPaymentDate >= repaymentDateFilter)
    .filter((loan) => !applicationDateFilter || loan.applicationDate >= applicationDateFilter)
    .sort((a, b) => (sortBy === 'balance' ? b.balanceAmount - a.balanceAmount : a.nextPaymentDate.getTime() - b.nextPaymentDate.getTime()));

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#181114] dark group/design-root overflow-x-hidden p-6">
      <h1 className="text-white text-2xl font-bold mb-6">Loan Dashboard</h1>

      {/* Progress bar section */}
      <div className="mb-8">
        <h2 className="text-white text-lg font-bold mb-4">Billing Progress</h2>
        <ProgressBar />
      </div>

      {/* Filter section */}
      <div className="mb-8 space-y-4">
        <h2 className="text-white text-lg font-bold">Filters</h2>
        <div className="flex items-center space-x-4">
          <label className="text-white">Balance:</label>
          <Slider value={[balanceFilter]} onValueChange={(value) => setBalanceFilter(value[0])} />
          <span className="text-white">${balanceFilter}</span>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-white">Repayment Date:</label>
          <Calendar selected={repaymentDateFilter} onSelect={setRepaymentDateFilter} />
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-white">Application Date:</label>
          <Calendar selected={applicationDateFilter} onSelect={setApplicationDateFilter} />
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-white">Sort by:</label>
          <Select value={sortBy} onValueChange={setSortBy} />
        </div>
      </div>

      {/* Loan cards section */}
      <div className="space-y-4">
        {filteredLoans.map((loan) => (
          <LoanCard key={loan.id} />
        ))}
      </div>
    </div>
  );
};

export default LendDetails;
