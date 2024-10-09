import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './CreateLien.css'; // Make sure to create this CSS file

const CONTRACT_ADDRESS = '0x5942c3c250dDEAAcD69d1aB7cCD81c261cF15204';
const CONTRACT_ABI = [
  "function createLien(uint256 landPrice, uint256 period, uint256 interestRate) public payable returns (uint256)"
];

interface LienData {
  landPrice: string;
  propertyId: string;
}

const CreateLienComponent: React.FC = () => {
  const [lienData, setLienData] = useState<LienData | null>(null);
  const [loanPeriod, setLoanPeriod] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Simulating fetching data from backend
    const fetchLienData = async () => {
      // Replace this with actual API call
      const mockData: LienData = {
        landPrice: '10',
        propertyId: 'PROP123'
      };
      setLienData(mockData);
    };

    fetchLienData();
  }, []);

  const handleCreateLien = async () => {
    // ... (keep the existing logic for creating a lien)
  };

  if (!lienData) {
    return <div className="loading">Loading lien data...</div>;
  }

  return (
    <div className="create-lien-component">
      <h2 className="title">Create Lien</h2>
      <div className="lien-info">
        <div className="info-item">
          <span className="label">Land Price:</span>
          <span className="value">{lienData.landPrice} ETH</span>
        </div>
        <div className="info-item">
          <span className="label">Property ID:</span>
          <span className="value">{lienData.propertyId}</span>
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="loanPeriod">Loan Period (in days)</label>
        <input
          id="loanPeriod"
          type="number"
          min="1"
          max="365"
          value={loanPeriod}
          onChange={(e) => setLoanPeriod(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="interestRate">Suggested Interest Rate (%)</label>
        <input
          id="interestRate"
          type="number"
          step="0.01"
          min="0"
          max="50"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          required
        />
      </div>
      <button onClick={handleCreateLien} className="submit-button">
        Submit to Marketplace for Financing
      </button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default CreateLienComponent;