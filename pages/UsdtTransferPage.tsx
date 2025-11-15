
import React, { useState } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { EthereumIcon } from '../components/icons/EthereumIcon';
import { InfoIcon } from '../components/icons/InfoIcon';
import { CopyIcon } from '../components/icons/CopyIcon';
import QrCode from '../components/QrCode';
import { ZarandaIcon } from '../components/icons/ZarandaIcon';
import { CheckIcon } from '../components/icons/CheckIcon';
import { DotsHorizontalIcon } from '../components/icons/DotsHorizontalIcon';

interface UsdtTransferPageProps {
  onBack: () => void;
}

const UsdtTransferPage: React.FC<UsdtTransferPageProps> = ({ onBack }) => {
  const walletAddress = "0x340a5cfe50ff47b2e6173c3d863946c1da9de9f1";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
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
        
        <button className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <h1 className="text-lg font-bold">USDT on Ethereum</h1>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        </button>

        <button
          className="p-2 -mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Options"
        >
          <DotsHorizontalIcon className="w-6 h-6" />
        </button>
      </header>
      
      <main className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col items-center">
        <div className="pt-8 pb-10">
            <QrCode />
        </div>

        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 space-y-4">
            {/* Wallet Address */}
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Wallet address</p>
                <div className="flex items-center justify-between mt-1">
                    <p className="font-mono text-sm break-all pr-2">{walletAddress}</p>
                    <button onClick={handleCopy} className="text-gray-500 dark:text-gray-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0">
                        {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Network */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Network</p>
                <div className="flex items-center mt-1">
                    <EthereumIcon className="w-6 h-6 text-gray-700 dark:text-gray-300 mr-2" />
                    <p className="font-semibold">Ethereum</p>
                </div>
            </div>

            {/* Fee */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Fee</p>
                    <InfoIcon className="w-4 h-4 ml-1" />
                </div>
                <p className="font-semibold mt-1">3 USDT</p>
            </div>
        </div>
        
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 max-w-sm">
            Only send <span className="font-bold text-gray-800 dark:text-gray-200">USDT</span> on the <span className="font-bold text-gray-800 dark:text-gray-200">Ethereum</span> network to this address. If you send another cryptocurrency, it may be lost.
        </p>

        <div className="flex-grow"></div>

        <footer className="py-4 flex items-center space-x-2 text-gray-400 dark:text-gray-600">
            <ZarandaIcon className="w-5 h-5" />
            <span className="font-semibold text-sm">Zaranda</span>
        </footer>
      </main>
    </div>
  );
};

export default UsdtTransferPage;
