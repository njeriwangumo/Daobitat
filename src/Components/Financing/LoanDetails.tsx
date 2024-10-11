import React from 'react';
import { CSSProperties } from 'react';

const customStyles: CSSProperties = {
  ['--select-button-svg' as string]: "url('data:image/svg+xml...')",
  fontFamily: '"Public Sans", "Noto Sans", sans-serif',
};

const LoanDetails: React.FC = () => {
  return (
    <div className="layout-container flex h-full grow flex-col">
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
          
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Loan details</h2>
          
          {/* Loan amount input */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                placeholder="Loan amount"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#533c47] bg-[#261c21] focus:border-[#533c47] h-14 placeholder:text-[#b89dab] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>
          
          {/* Interest rate input */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                placeholder="Interest rate"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#533c47] bg-[#261c21] focus:border-[#533c47] h-14 placeholder:text-[#b89dab] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>
          
          {/* Repayment period input */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                placeholder="Repayment period"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#533c47] bg-[#261c21] focus:border-[#533c47] h-14 placeholder:text-[#b89dab] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>

          {/* Collateral value dropdown */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <select
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#533c47] bg-[#261c21] focus:border-[#533c47] h-14 bg-[image:var(--select-button-svg)] placeholder:text-[#b89dab] p-[15px] text-base font-normal leading-normal"
              >
                <option value="one">Collateral Asset on chain</option>
                <option value="two">Real estate</option>
                <option value="three">Vehicles</option>
                <option value="four">Stocks</option>
              </select>
            </label>
          </div>

          {/* Submit button */}
          <div className="flex justify-center pt-4">
            <button className="bg-[#533c47] text-white rounded-xl px-6 py-3 font-medium text-base hover:bg-[#3b2934] focus:outline-none focus:ring-2 focus:ring-[#b89dab]">
              Submit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
