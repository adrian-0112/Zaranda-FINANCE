
import React from 'react';

export const StatementIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.267c-.317.027-.631.052-.946.075a15.003 15.003 0 0 1-5.656 0c-.315-.023-.629-.048-.946-.075l-3.722-.267C3.347 17.1 2.5 16.136 2.5 15v-4.286c0-.97.616-1.813 1.5-2.097m16.25 0a14.998 14.998 0 0 0-16.25 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12.75h7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15.75h4.5" />
    </svg>
);
