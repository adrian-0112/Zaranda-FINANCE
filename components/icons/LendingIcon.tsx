
import React from 'react';

export const LendingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 16.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L6.75 17.25" />
  </svg>
);
