
import React, { useState } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { DotsHorizontalIcon } from '../components/icons/DotsHorizontalIcon';
import { CopyIcon } from '../components/icons/CopyIcon';
import { CheckIcon } from '../components/icons/CheckIcon';
import { InfoIcon } from '../components/icons/InfoIcon';
import { ZarandaIcon } from '../components/icons/ZarandaIcon';
import IconWithOverlay from '../components/IconWithOverlay';
import Accordion from '../components/Accordion';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';

interface AchWireTransferPageProps {
  onBack: () => void;
}

const DetailRow: React.FC<{ label: string; value: string; onCopy: () => void; copied: boolean; }> = ({ label, value, onCopy, copied }) => (
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

const AppLogo: React.FC<{ name: string; bgColor: string; textColor?: string }> = ({ name, bgColor, textColor = 'text-white' }) => (
    <div className={`px-2 py-1 ${bgColor} ${textColor} rounded-lg font-bold text-sm shadow-md`}>
        {name}
    </div>
);

const AchWireTransferPage: React.FC<AchWireTransferPageProps> = ({ onBack }) => {
    const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

    const details = {
        beneficiary: "Adrián Vargas",
        bank: "Lead Bank",
        accountNo: "214693997270",
        routingNo: "101019644",
        accountAddress: "Avenida Centenario, 2702\nCiudad de México\nCiudad de México 01590\nMexico",
        bankAddress: "1801 Main St.\nKansas City\nMissouri 64108\nUnited States"
    };
    
    const handleCopy = (key: string, text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedStates(prev => ({ ...prev, [key]: true }));
            setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
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
            <h1 className="text-lg font-bold">ACH & Wire</h1>
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
                            <span className="text-3xl">🇺🇸</span>
                        </IconWithOverlay>
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">Your US account details</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Transfer USD to your account</p>
                    </div>
                </div>
                <DetailRow label="Beneficiary name" value={details.beneficiary} onCopy={() => handleCopy('beneficiary', details.beneficiary)} copied={copiedStates.beneficiary} />
                <DetailRow label="Bank name" value={details.bank} onCopy={() => handleCopy('bank', details.bank)} copied={copiedStates.bank} />
                <DetailRow label="Account no." value={details.accountNo} onCopy={() => handleCopy('accountNo', details.accountNo)} copied={copiedStates.accountNo} />
                <DetailRow label="Routing no." value={details.routingNo} onCopy={() => handleCopy('routingNo', details.routingNo)} copied={copiedStates.routingNo} />
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Account type</p>
                    <p className="font-semibold text-lg mt-1">Checking</p>
                </div>
                <div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <p>Fee</p>
                        <InfoIcon className="w-4 h-4 ml-1" />
                    </div>
                    <p className="font-semibold text-lg mt-1">3 USD</p>
                </div>
            </div>

            {/* Accordions */}
            <Accordion title="Account address">
                <div className="flex justify-between items-start">
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{details.accountAddress}</p>
                    <button onClick={() => handleCopy('accountAddress', details.accountAddress)} className="text-gray-500 dark:text-gray-400 p-2 -mr-2 -mt-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0">
                        {copiedStates.accountAddress ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5" />}
                    </button>
                </div>
            </Accordion>
            <Accordion title="Bank address">
                 <div className="flex justify-between items-start">
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{details.bankAddress}</p>
                    <button onClick={() => handleCopy('bankAddress', details.bankAddress)} className="text-gray-500 dark:text-gray-400 p-2 -mr-2 -mt-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0">
                        {copiedStates.bankAddress ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5" />}
                    </button>
                </div>
            </Accordion>

            {/* Questions Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 flex justify-between items-center">
                <div>
                    <h3 className="font-bold">Questions?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 my-1">How-to guides for adding balance from your favorite apps.</p>
                    <a href="#" className="text-green-500 font-semibold text-sm">Go to guides</a>
                </div>
                <div className="flex flex-col space-y-2 items-end">
                    <AppLogo name="deel." bgColor="bg-blue-500" />
                    <div className="flex space-x-2">
                       <AppLogo name="PayPal" bgColor="bg-blue-800" />
                       <AppLogo name="wise" bgColor="bg-white" textColor="text-green-500" />
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div>
                <h2 className="text-lg font-bold my-4 px-1">FAQs</h2>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                    <button className="w-full flex justify-between items-center p-4 text-left">
                        <span className="font-semibold">Add balance using ACH</span>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="w-full flex justify-between items-center p-4 text-left">
                        <span className="font-semibold">Your first top-up using USD</span>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>
            
            <div className="h-16"></div> {/* Spacer */}
        </main>
        
        <footer className="py-4 flex items-center justify-center space-x-2 text-gray-400 dark:text-gray-600">
            <ZarandaIcon className="w-5 h-5" />
            <span className="font-semibold text-sm">Zaranda</span>
        </footer>
    </div>
  );
};

export default AchWireTransferPage;
