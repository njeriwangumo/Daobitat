import React from 'react';
import { CSSProperties } from 'react';

interface FinancingHeaderProps {
    currentTab: string;
    onTabChange: (tab: string) => void;
  }

const customStyles: CSSProperties = {
  ['--select-button-svg' as string]: "url('data:image/svg+xml...",
  fontFamily: '"Public Sans", "Noto Sans", sans-serif'
};

const FinancingHeader: React.FC<FinancingHeaderProps> = ({ currentTab, onTabChange }) => {
  return (
  <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#382932] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              
            </div>
          
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
  
            <a className={`text-white text-sm font-medium leading-normal ${currentTab === 'Borrow' ? 'underline' : ''}`} href="#" onClick={() => onTabChange('Borrow')}>Borrow</a>
          <a className={`text-white text-sm font-medium leading-normal ${currentTab === 'Lend' ? 'underline' : ''}`} href="#" onClick={() => onTabChange('Lend')}>Lend</a>
          <a className={`text-white text-sm font-medium leading-normal ${currentTab === 'ApprovedRequests' ? 'underline' : ''}`} href="#" onClick={() => onTabChange('ApprovedRequests')}>Approved requests</a>
          <a className={`text-white text-sm font-medium leading-normal ${currentTab === 'PendingRequests' ? 'underline' : ''}`} href="#" onClick={() => onTabChange('PendingRequests')}>Pending requests</a>
          <a className={`text-white text-sm font-medium leading-normal ${currentTab === 'Statement' ? 'underline' : ''}`} href="#" onClick={() => onTabChange('Statement')}>Statement</a>
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
        )}


export default FinancingHeader ;