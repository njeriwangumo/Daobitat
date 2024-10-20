import React from 'react';
import PaymentMethod from './Components/Dashboards/AddProperty/Billing/PaymentMethod';
import LoanCard from './Components/Dashboards/AddProperty/Billing/LoanCard';
import NftsOwned from './Components/Financing/NFTowned';
import PaymentSuccess from './Components/Financing/PaymentSuccess';
import Portfolio from './Components/Financing/Portfolio';
import TopPicks from './Components/Financing/TopPicks';

const loanCardProps = {
  earnings: 5000,
  totalBilled: 50000,
  feesAndTaxes: 500,
  loanName: "Home Loan",
  assetLien: "Property at 123 Main St",
  interestRate: 3.5,
  openDate: "2023-01-01",
  maturityDate: "2053-01-01",
  terms: "30 years",
  balanceAmount: 48000,
  jobName: "Primary Residence Loan",
  feesDetails: "Origination fee: $1000, Appraisal fee: $500"
};
const DummyPage: React.FC = () => {
  return (
    <>
    <p> Loan Card</p>
    <LoanCard {...loanCardProps} />

    <p> NFTs owned</p>
    <NftsOwned />
    <p> Payment Success</p>
    <PaymentSuccess />
    <p> Portfolio</p>
    <Portfolio />
    <p> top picks</p>
    <TopPicks/>
    <p> Choose payment method</p>
    <PaymentMethod />

 

    </>
  );
};

export default DummyPage;
