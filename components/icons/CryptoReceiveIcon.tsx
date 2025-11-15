import React from 'react';

export const CryptoReceiveIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.21 12.77 11 12 11h-1.5a2.25 2.25 0 00-2.25 2.25v2.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 6.375a9 9 0 1 1-6 0" />
  </svg>
);