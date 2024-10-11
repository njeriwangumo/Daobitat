import React from 'react';

const loanData = [
  { id: 1, title: 'User 1', columnA: '$15,000', columnB: '3 Years' },
  { id: 2, title: 'User 2', columnA: '$25,000', columnB: '5 Years' },
  { id: 3, title: 'User 3', columnA: '$10,000', columnB: '2 Years' },
  { id: 4, title: 'User 4', columnA: '$20,000', columnB: '10 Years' },
  { id: 5, title: 'User 5', columnA: '$50,000', columnB: '7 Years' },
  { id: 6, title: 'Medical Expense Loan', columnA: '$5,000', columnB: '1 Year' },
  { id: 7, title: 'Vacation Loan', columnA: '$12,000', columnB: '3 Years' },
  { id: 8, title: 'Debt Consolidation Loan', columnA: '$30,000', columnB: '4 Years' },
  { id: 9, title: 'Green Energy Loan', columnA: '$40,000', columnB: '15 Years' },
  { id: 10, title: 'Wedding Loan', columnA: '$8,000', columnB: '2 Years' },
  { id: 11, title: 'Equipment Purchase Loan', columnA: '$35,000', columnB: '5 Years' },
  { id: 12, title: 'Investment Loan', columnA: '$60,000', columnB: '8 Years' },
  { id: 13, title: 'Refinancing Loan', columnA: '$45,000', columnB: '6 Years' },
  { id: 14, title: 'Property Improvement Loan', columnA: '$18,000', columnB: '4 Years' },
  { id: 15, title: 'Startup Loan', columnA: '$70,000', columnB: '10 Years' },
];

const LoanDetails: React.FC = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#181114] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#382930] px-10 py-3">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#382930] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </div>
          </button>
          {/* Additional buttons can be added here */}
        </header>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Loan Title</th>
              <th className="table-23738f56-7fb3-4d5d-80a5-14a2bcaf059e-column-56">Column A</th>
              <th className="table-23738f56-7fb3-4d5d-80a5-14a2bcaf059e-column-176">Column B</th>
            </tr>
          </thead>
          <tbody>
            {loanData.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.title}</td>
                <td className="table-23738f56-7fb3-4d5d-80a5-14a2bcaf059e-column-56">{loan.columnA}</td>
                <td className="table-23738f56-7fb3-4d5d-80a5-14a2bcaf059e-column-176">{loan.columnB}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <style>
          {`
            @container(max-width:56px){.table-23738f56-7fb3-4d5d-80a5-14a2bcaf059e-column-56{display: none;}}
            @container(max-width:176px){.table-23738f56-7fb3-4d5d-80a5-14a2bcaf059e-column-176{display: none;}}
            /* Add more media queries as needed */
          `}
        </style>
      </div>
    </div>
  );
};

export default LoanDetails;
