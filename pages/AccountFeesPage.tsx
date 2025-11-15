
import React from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { QuestionMarkCircleIcon } from '../components/icons/QuestionMarkCircleIcon';

interface AccountFeesPageProps {
  onBack: () => void;
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 mt-6">
    {title}
  </h2>
);

const FeeItem: React.FC<{ label: string; value: string; isLast?: boolean }> = ({ label, value, isLast = false }) => (
  <div className={`flex justify-between py-3 ${isLast ? '' : 'border-b border-gray-100 dark:border-gray-700'}`}>
    <p className="text-gray-600 dark:text-gray-300">{label}</p>
    <p className="font-semibold text-gray-800 dark:text-gray-100">{value}</p>
  </div>
);

const AccountFeesPage: React.FC<AccountFeesPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black">
      <header className="flex-shrink-0 p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Account fees
        </h1>
        <button
          className="p-2 -mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Help"
        >
          <QuestionMarkCircleIcon className="w-6 h-6" />
        </button>
      </header>
      
      <main className="flex-grow overflow-y-auto no-scrollbar p-4">
        {/* Account Section */}
        <SectionHeader title="Account" />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <FeeItem label="Maintenance" value="Free" />
          <FeeItem label="Swaps (USDT <> MXNB)" value="0.5%" isLast />
        </div>

        {/* Deposits Section */}
        <SectionHeader title="Deposits (Top-ups)" />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <FeeItem label="USDT Transfer" value="Network Fee" />
          <FeeItem label="U.S. dollar transfer (ACH/Wire)" value="3.00 USDT" />
          <FeeItem label="SPEI transfer (MXN)" value="Free" isLast />
        </div>

        {/* Withdrawals Section */}
        <SectionHeader title="Withdrawals (Sends)" />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <FeeItem label="Zaranda Transfer" value="Free" />
          <FeeItem label="Mexico bank transfer (SPEI)" value="10.00 MXNB" />
          <FeeItem label="U.S. dollar transfer (ACH)" value="5.00 USDT" />
          <FeeItem label="Crypto (USDT)" value="Network Fee" isLast />
        </div>
      </main>
    </div>
  );
};

export default AccountFeesPage;
