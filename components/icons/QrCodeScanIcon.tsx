
import React from 'react';

export const QrCodeScanIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5v.001h.002V4.5h-.002zm2.25.001v.001h.002V4.5H6zm-2.25 2.25v.001h.002v-.001h-.002zm0 2.25v.001h.002V9h-.002zm2.25 0v.001h.002V9H6zM9 4.5v.001h.002V4.5H9zM3.75 9v.001h.002V9h-.002zm5.25.001v.001h.002V9H9z" transform="scale(1.25) translate(-2.5 -2.5)" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 4.5h3m-3 3h3m-3 3h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5v3a1.5 1.5 0 001.5 1.5h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21h3a1.5 1.5 0 001.5-1.5v-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5v-3A1.5 1.5 0 0019.5 6h-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 3H7.5A1.5 1.5 0 006 4.5v3" />
    </svg>
);
