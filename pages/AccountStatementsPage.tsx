
import React, { useState } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import ToggleSwitch from '../components/ToggleSwitch';

interface AccountStatementsPageProps {
  onBack: () => void;
}

const AccountStatementsPage: React.FC<AccountStatementsPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'usdt' | 'mxnb'>('usdt');
  const [usdtEmail, setUsdtEmail] = useState(true);
  const [mxnbEmail, setMxnbEmail] = useState(true);

  const StatementContent: React.FC<{
    emailEnabled: boolean;
    setEmailEnabled: (enabled: boolean) => void;
  }> = ({ emailEnabled, setEmailEnabled }) => (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Get via email</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Receive monthly statements</p>
          </div>
          <ToggleSwitch enabled={emailEnabled} onChange={setEmailEnabled} />
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Account statements will appear here.</p>
      </div>
    </>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black">
      <header className="flex-shrink-0 p-4 flex items-center border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mx-auto">
          Account statements
        </h1>
        <div className="w-8"></div> {/* Spacer to center title */}
      </header>
      
      <nav className="flex-shrink-0 p-4 pb-0">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('usdt')}
            className={`flex-1 py-3 text-center font-semibold text-sm transition-colors ${
              activeTab === 'usdt'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
            aria-pressed={activeTab === 'usdt'}
          >
            USDT
          </button>
          <button
            onClick={() => setActiveTab('mxnb')}
            className={`flex-1 py-3 text-center font-semibold text-sm transition-colors ${
              activeTab === 'mxnb'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
            aria-pressed={activeTab === 'mxnb'}
          >
            MXNB
          </button>
        </div>
      </nav>

      <main className="flex-grow flex flex-col p-4">
        {activeTab === 'usdt' ? (
          <StatementContent emailEnabled={usdtEmail} setEmailEnabled={setUsdtEmail} />
        ) : (
          <StatementContent emailEnabled={mxnbEmail} setEmailEnabled={setMxnbEmail} />
        )}
      </main>
    </div>
  );
};

export default AccountStatementsPage;
