import React from 'react';

const FinancingDashboard: React.FC = () => {
  // Dummy data
  const properties = [
    { id: 1, address: "123 Main St", status: "Approved", offers: 2 },
    { id: 2, address: "456 Elm St", status: "Pending", offers: 0 },
    { id: 3, address: "789 Oak St", status: "Rejected", offers: 0 },
  ];

  const loans = [
    { id: 1, amount: 100000, paid: 25000, status: "Active" },
    { id: 2, amount: 75000, paid: 75000, status: "Paid" },
    { id: 3, amount: 50000, paid: 10000, status: "Active" },
  ];

  const earnings = {
    daoProjects: 5000,
    previousProjects: 15000,
  };

  return (
    <div className="container">
      <h1 className="title">Financing Dashboard</h1>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Quick Actions</h2>
          <div className="button-group">
            <button className="btn">View All Transactions</button>
            <button className="btn">Offer to Lend</button>
            <button className="btn">Bring Property On-Chain</button>
          </div>
        </div>

        <div className="card">
          <h2>Earnings Overview</h2>
          <p>DAO Projects: ${earnings.daoProjects}</p>
          <p>Previous Projects: ${earnings.previousProjects}</p>
          <p className="total">Total: ${earnings.daoProjects + earnings.previousProjects}</p>
        </div>
      </div>

      <div className="tabs">
        <button className="tab-btn active">Properties</button>
        <button className="tab-btn">Loans</button>
      </div>

      <div className="tab-content">
        <div className="card">
          <h2>Your Properties</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Address</th>
                <th>Status</th>
                <th>Offers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.address}</td>
                  <td>{property.status}</td>
                  <td>{property.offers}</td>
                  <td>
                    <button className="btn-small">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card" style={{display: 'none'}}>
          <h2>Your Loans</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>${loan.amount}</td>
                  <td>${loan.paid}</td>
                  <td>{loan.status}</td>
                  <td>
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{width: `${(loan.paid / loan.amount) * 100}%`}}
                      ></div>
                    </div>
                  </td>
                  <td>
                    <button className="btn-small">Make Payment</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancingDashboard;