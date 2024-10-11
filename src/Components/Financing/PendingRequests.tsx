import React from 'react';
import { CSSProperties } from 'react';


const customStyles: CSSProperties = {
  ['--select-button-svg' as string]: "url('data:image/svg+xml...",
  fontFamily: '"Public Sans", "Noto Sans", sans-serif'
};
const PendingRequests: React.FC = () => {
  return (<div> Pending Requests</div>)}

export default PendingRequests;