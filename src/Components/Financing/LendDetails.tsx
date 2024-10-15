import React, { useState, useCallback, useEffect } from 'react';
import { CSSProperties } from 'react';
import { useUser } from '../../contexts/UserContext';
import { collection, query, where, getDocs, addDoc,  QueryDocumentSnapshot, collectionGroup,doc , getDoc, DocumentSnapshot, DocumentData  } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import PropertyFormContainer from '../Dashboards/AddProperty/PropertyFormContainer';




interface MarketplaceLoan {
  id: string;
  propertyId: string;
  loanAmount: string;
  interestRate: string;
  loanPeriod: string;
  borrowerAddress: string;
  timestamp: Date;
}




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
    <option value="balance">Amount</option>
    <option value="repaymentDate">Repayment Period</option>
  </select>
);

const LendDetails: React.FC = () => {
  const [balanceFilter, setBalanceFilter] = useState<number>(0);
  const [repaymentDateFilter, setRepaymentDateFilter] = useState<Date | undefined>(undefined);
  const [applicationDateFilter, setApplicationDateFilter] = useState<Date | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>('balance');

  const [marketplaceLoans, setMarketplaceLoans] = useState<MarketplaceLoan[]>([]);

  


  const fetchMarketplaceLoans = useCallback(async () => {
    try {
      console.log("Starting to fetch marketplace loans...");
  
      const loansQuery = query(
        collectionGroup(firestore, 'Requested loans'),
        where("status", "==", "in-marketplace")
      );
      console.log("Query created:", loansQuery);
  
      console.log("Executing query...");
      const querySnapshot = await getDocs(loansQuery);
      console.log(`Query executed. Snapshot size: ${querySnapshot.size}`);
  
      const loans: MarketplaceLoan[] = [];
      console.log("Processing documents...");
  
      let docCounter = 0;
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        docCounter++;
        console.log(`Processing document ${docCounter}:`);
        console.log(`Document ID: ${doc.id}`);
        console.log(`Document path: ${doc.ref.path}`);
  
        const data = doc.data();
        console.log("Document data:", data);
  
        if (data.status === "in-marketplace") {
          loans.push({
            id: doc.id,
            propertyId: data.propertyId,
            loanAmount: data.loanAmount,
            interestRate: data.interestRate,
            loanPeriod: data.repaymentPeriod || data.loanPeriod,
            borrowerAddress: data.borrowerAddress || 'Unknown',
            timestamp: data.timestamp?.toDate() || new Date(),
          });
          console.log("Loan added to the list.");
        } else {
          console.log("Document skipped: status is not 'in-marketplace'");
        }
      });
  
      console.log(`Processed ${querySnapshot.size} documents.`);
      console.log(`Created ${loans.length} loan objects.`);
  
      setMarketplaceLoans(loans);
      console.log(`Set ${loans.length} marketplace loans in state.`);
    } catch (error) {
      console.error('Error fetching marketplace loans:', error);
    }
  }, []);
  
  useEffect(() => {
    console.log("Calling fetchMarketplaceLoans...");
    fetchMarketplaceLoans();
  }, [fetchMarketplaceLoans]);
 

  // Filter and sort loans
  const filteredLoans = marketplaceLoans
    .filter((loan) => {
      const loanAmountNumber = parseFloat(loan.loanAmount);
      return !isNaN(loanAmountNumber) && loanAmountNumber >= balanceFilter;
    })
    .filter((loan) => {
      if (!repaymentDateFilter) return true;
      const repaymentDate = new Date(loan.timestamp.getTime() + parseInt(loan.loanPeriod) * 24 * 60 * 60 * 1000);
      return repaymentDate >= repaymentDateFilter;
    })
    .filter((loan) => {
      if (!applicationDateFilter) return true;
      return loan.timestamp >= applicationDateFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'amount') {
        return parseFloat(b.loanAmount) - parseFloat(a.loanAmount);
      } else { // 'repaymentDate'
        const aRepaymentDate = new Date(a.timestamp.getTime() + parseInt(a.loanPeriod) * 24 * 60 * 60 * 1000);
        const bRepaymentDate = new Date(b.timestamp.getTime() + parseInt(b.loanPeriod) * 24 * 60 * 60 * 1000);
        return aRepaymentDate.getTime() - bRepaymentDate.getTime();
      }
    });


  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#181114] dark group/design-root overflow-x-hidden p-6">
      <div className="bg-[#181114] p-8 rounded-lg shadow-lg">
        <h1 className="text-[#b7e3cc] text-4xl font-bold mb-4 tracking-wide">
          Venture <span className="text-white">Vineyard</span>
        </h1>
        <h2 className="text-[#b7e3cc] text-xl leading-relaxed">
          Piece together a <span className="font-semibold text-white">vibrant tapestry</span> of projects, where every <span className="font-semibold text-white">investment</span> adds <span className="font-semibold text-white">color to the big picture</span>.
        </h2>
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
          <label className="text-white">Repayment Period:</label>
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

        {/* Marketplace Loans Section */}
        {filteredLoans.length === 0 ? (
        <p className="text-white px-4">No loans available matching your criteria.</p>
      ) : (
        <ul className="space-y-4 px-4">
          {filteredLoans.map((loan) => (
            <li key={loan.id} className="bg-[#261c21] rounded-xl p-4 text-white">
              <p>Property ID: {loan.propertyId}</p>
              <p>Loan Amount: {loan.loanAmount} ETH</p>
              <p>Interest Rate: {loan.interestRate}%</p>
              <p>Loan Period: {loan.loanPeriod} days</p>
              <p>Borrower: {loan.borrowerAddress.slice(0, 6)}...{loan.borrowerAddress.slice(-4)}</p>
              <p>Listed: {loan.timestamp.toLocaleDateString()}</p>
              <p>Repayment Date: {new Date(loan.timestamp.getTime() + parseInt(loan.loanPeriod) * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              <button 
                className="mt-2 bg-[#533c47] text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-[#3b2934] focus:outline-none focus:ring-2 focus:ring-[#b89dab]"
                onClick={() => {/* Add function to invest in this loan */}}
              >
                Invest
              </button>
            </li>
          ))}
        </ul>
      )}

     
    </div>
  );
};

export default LendDetails;
