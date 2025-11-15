import React from 'react';

export const UsdtIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="16" cy="16" r="16" fill="#26A17B"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M10 12H22V14H17V22H15V14H10V12Z" fill="white"/>
    </svg>
);