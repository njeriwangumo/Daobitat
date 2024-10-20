import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi'; 

interface DownloadButtonProps {
  url: string;
  filename: string;
  label?: string;
}




const Billings: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeInvestment, setActiveInvestment] = useState<number | null>(null);
  
  const dummyData = {
    name: 'Mario Seijo',
    earnings: 221.00,
    totalBilled: 250.00,
    totalFees: 29.00,
    jobName: 'Web Development Project',
    feesAndTaxes: 29.00,
    billed: 250.00,
  };

  const investments = [
    { id: 1, name: 'Investment 1', amount: 500, return: 5 },
    { id: 2, name: 'Investment 2', amount: 1000, return: 7 },
    { id: 3, name: 'Investment 3', amount: 1500, return: 10 },
  ];

  return (
    <div>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Upcoming Billings & Invoices</h1>
        <p className="mb-4">
          View your open Bills and <a href="#" className="text-green-600">transaction history</a>.
        </p>

        <div className="flex space-x-4 mb-4">
          <button className="px-4 py-2 border border-green-600 text-green-600 rounded">Pending Invoices</button>
          <button className="px-4 py-2 text-gray-600">Settled Invoices</button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span>Nov 1, 2023 - Oct 13, 2024</span>
            <button className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </button>
          </div>
          <button className="px--2 py--2 bg-hover: bg-slategray  text-white rounded">
          <FiDownload className="w-8 h-8" /></button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{dummyData.name}</h2>
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">💰</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-3xl font-bold">${dummyData.earnings.toFixed(2)}</h3>
              <p className="text-gray-600">Loan card pulled</p>
            </div>
            <button 
              onClick={() => setIsDialogOpen(true)} 
              className="mt-4 px-4 py-2 bg-celadon text-white rounded hover:bg-slategray"
            >
              View Transaction
            </button>
          </div>
        </div>

        {/* Investments Section */}
        <div className="bg-black p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-black">Your Investments</h2>
          <ul className="space-y-2">
            {investments.map((investment) => (
              <li
                key={investment.id}
                className="p-3 bg-black rounded-lg transition-all duration-300 hover:bg-gray-200 cursor-pointer"
                onClick={() => setActiveInvestment(activeInvestment === investment.id ? null : investment.id)}
                onMouseEnter={() => setActiveInvestment(investment.id)}
                onMouseLeave={() => setActiveInvestment(null)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{investment.name}</span>
              
                </div>
                {activeInvestment === investment.id && (
                  <div className="mt-2 text-sm text-black">
                    <p>Amount: ${investment.amount.toLocaleString()}</p>
                    <p>Return: {investment.return}%</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-4 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
              <p>Here you can view the details of your transactions.</p>
              {/* Add more transaction details here */}
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billings;