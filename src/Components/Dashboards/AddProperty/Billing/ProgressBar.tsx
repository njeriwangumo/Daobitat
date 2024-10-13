import React from 'react';

// Define the interface for the props
interface ProgressBarProps {
  totalPaid: number;
  totalRemaining: number;
  nextInstallmentDate: string;
  nextInstallmentAmount: number;
  totalFinanced: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalPaid,
  totalRemaining,
  nextInstallmentDate,
  nextInstallmentAmount,
  totalFinanced,
}) => {
  const progressPercentage = (totalPaid / totalFinanced) * 100;

  return (
    <div
      style={{
        backgroundColor: '#f7f7f7',
        borderRadius: '12px',
        padding: '20px',
        maxWidth: '600px', // Set maxWidth
        width: '100%', // Set width to 100%
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '10px',
        }}
      >
        <div>
          <div>Total Paid</div>
          <div style={{ color: '#000' }}>${totalPaid.toFixed(2)}</div>
        </div>
        <div>
          <div>Total Remaining</div>
          <div style={{ color: '#000' }}>${totalRemaining.toFixed(2)}</div>
        </div>
      </div>

      <div
        style={{
          height: '10px',
          borderRadius: '5px',
          backgroundColor: '#ddd',
          marginBottom: '10px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercentage}%`,
            backgroundColor: '#00c853',
          }}
        />
      </div>

      <div
        style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '15px',
        }}
      >
        Next installment on {nextInstallmentDate}: ${nextInstallmentAmount.toFixed(2)}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '16px',
          fontWeight: 'bold',
          borderTop: '1px solid #ddd',
          paddingTop: '10px',
        }}
      >
        <div>Total Loan Amount</div>
        <div>${totalFinanced.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
