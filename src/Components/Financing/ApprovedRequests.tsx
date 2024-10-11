import React, { useState } from 'react';
import { CSSProperties } from 'react';
import CreateLien from './CreateLien';

const customStyles: CSSProperties = {
  ['--select-button-svg' as string]: "url('data:image/svg+xml...",
  fontFamily: '"Public Sans", "Noto Sans", sans-serif'
};

const ApprovedRequests: React.FC = () => {
  const [isCreateLienOpen, setIsCreateLienOpen] = useState(false);

  const openCreateLien = () => {
    setIsCreateLienOpen(true);
  };

  const closeCreateLien = () => {
    setIsCreateLienOpen(false);
  };

  return (
    <div>
      <p>Approved for Prop123</p>
      <button onClick={openCreateLien}>Create lien for Prop123</button>

      {isCreateLienOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <CreateLien onClose={closeCreateLien} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedRequests;