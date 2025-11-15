
import React, { useState } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { DotsHorizontalIcon } from '../components/icons/DotsHorizontalIcon';
import { CopyIcon } from '../components/icons/CopyIcon';
import { CheckIcon } from '../components/icons/CheckIcon';
import { InfoIcon } from '../components/icons/InfoIcon';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import { ZarandaIcon } from '../components/icons/ZarandaIcon';
import IconWithOverlay from '../components/IconWithOverlay';

interface SpeiTransferPageProps {
  onBack: () => void;
}

const InfoRow: React.FC<{ label: string; value: string; onCopy: () => void; copied: boolean; }> = ({ label, value, onCopy, copied }) => (
    <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <div className="flex items-center justify-between mt-1">
            <p className="font-semibold text-lg">{value}</p>
            <button onClick={onCopy} className="text-gray-500 dark:text-gray-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0">
                {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5" />}
            </button>
        </div>
    </div>
);

const SpeiTransferPage: React.FC<SpeiTransferPageProps> = ({ onBack }) => {
    const [copiedStates, setCopiedStates] = useState({ beneficiary: false, bank: false, clabe: false });

    const details = {
        beneficiary: "Adrián Vargas",
        bank: "Arcus",
        clabe: "706969329222624335"
    };
    
    const handleCopy = (field: keyof typeof details) => {
        navigator.clipboard.writeText(details[field]).then(() => {
            setCopiedStates(prev => ({ ...prev, [field]: true }));
            setTimeout(() => setCopiedStates(prev => ({ ...prev, [field]: false })), 2000);
        });
    };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
        <header className="flex-shrink-0 p-4 pt-6 flex items-center justify-between">
            <button
            onClick={onBack}
            className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Go back"
            >
            <ArrowLeftIcon className="w-6 h-6" />
            </button>
            
            <h1 className="text-lg font-bold">Mexico</h1>

            <button
            className="p-2 -mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Options"
            >
            <DotsHorizontalIcon className="w-6 h-6" />
            </button>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
            {/* Details Card */}
            <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 space-y-5">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-full">
                        <IconWithOverlay>
                            <span className="text-3xl">🇲🇽</span>
                        </IconWithOverlay>
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">Your Mexico account details</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add Digital dollar with MXN</p>
                    </div>
                </div>

                <InfoRow label="Beneficiary name" value={details.beneficiary} onCopy={() => handleCopy('beneficiary')} copied={copiedStates.beneficiary} />
                <InfoRow label="Bank name" value={details.bank} onCopy={() => handleCopy('bank')} copied={copiedStates.bank} />
                <InfoRow label="CLABE" value={details.clabe} onCopy={() => handleCopy('clabe')} copied={copiedStates.clabe} />
                
                <div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <p>Fee</p>
                        <InfoIcon className="w-4 h-4 ml-1" />
                    </div>
                    <p className="font-semibold text-lg mt-1">Free</p>
                </div>
            </div>

            {/* Rate Card */}
            <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 dark:text-gray-400">Rate</p>
                    <p className="font-semibold text-lg">1 USDc = 18.45 MXN</p>
                </div>
                <button className="flex items-center text-green-500 font-semibold mt-2 group">
                    <span>Exchange calculator</span>
                    <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
            </div>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4">
                Exchange rate may differ depending on how quickly your transfer is received.
            </p>
        </main>
        
        <footer className="py-4 flex items-center justify-center space-x-2 text-gray-400 dark:text-gray-600">
            <ZarandaIcon className="w-5 h-5" />
            <span className="font-semibold text-sm">Zaranda</span>
        </footer>
    </div>
  );
};

export default SpeiTransferPage;
