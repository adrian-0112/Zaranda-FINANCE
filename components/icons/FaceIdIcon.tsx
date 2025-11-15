
import React from 'react';

export const FaceIdIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M7 3H5a2 2 0 0 0-2 2v2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <path d="M17 21h2a2 2 0 0 0 2-2v-2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M11 16h2" />
    </svg>
);
