import React from 'react';
import { CSSProperties } from 'react';


const customStyles: CSSProperties = {
  ['--select-button-svg' as string]: "url('data:image/svg+xml...",
  fontFamily: '"Public Sans", "Noto Sans", sans-serif'
};
const FinancingDashboard: React.FC = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#181114] dark group/design-root overflow-x-hidden"
      style={customStyles}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#382932] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              
            </div>
          
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
  
              <a className="text-white text-sm font-medium leading-normal" href="#">Borrow</a>
              <a className="text-white text-sm font-medium leading-normal" href="#">Lend</a>
              <a className="text-white text-sm font-medium leading-normal" href="#">Approved requests</a>
              <a className="text-white text-sm font-medium leading-normal" href="#">Pending requests</a>
              <a className="text-white text-sm font-medium leading-normal" href="#">Statement</a>
            </div>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#5f133e] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Connect Wallet</span>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/d95cea0c-2957-448a-8f02-103cef67ce22.png")'
              }}
            ></div>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-2 pt-4">
            Unlock the full potential of your local assets for global financial freedom
            </h2>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Loan details</h2>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  placeholder="Loan amount"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#533c47] bg-[#261c21] focus:border-[#533c47] h-14 placeholder:text-[#b89dab] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <select
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#533c47] bg-[#261c21] focus:border-[#533c47] h-14 bg-[image:var(--select-button-svg)] placeholder:text-[#b89dab] p-[15px] text-base font-normal leading-normal"
                >
                  <option value="one">Interest rate</option>
                  <option value="two">two</option>
                  <option value="three">three</option>
                </select>
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <select
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#533c47] bg-[#261c21] focus:border-[#533c47] h-14 bg-[image:var(--select-button-svg)] placeholder:text-[#b89dab] p-[15px] text-base font-normal leading-normal"
                >
                  <option value="one">Repayment period</option>
                  <option value="two">two</option>
                  <option value="three">three</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancingDashboard;
