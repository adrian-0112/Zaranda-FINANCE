
import React from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { InfoIcon } from '../components/icons/InfoIcon';

interface TransactionLimitsPageProps {
  onBack: () => void;
}

const TransactionLimitsPage: React.FC<TransactionLimitsPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black">
      <header className="flex-shrink-0 p-4 flex items-center justify-center relative border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors absolute left-4"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Transaction limits</h1>
      </header>

      <main className="flex-grow p-4 mt-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 text-lg">
              Monthly total transaction volume
            </h2>
            <button className="text-gray-400 hover:text-gray-600">
              <InfoIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 my-3">
            {/* A small sliver of green, as shown in the image */}
            <div
              className="bg-green-500 h-1.5 rounded-full"
              style={{ width: `1%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mt-2 mb-6">
            <span>$15,000.00 left</span>
            <span>$15,000.00 per month</span>
          </div>

          <button className="w-full bg-green-500 text-white font-semibold py-3 rounded-full hover:bg-green-600 transition-colors">
            Increase limit
          </button>
        </div>
      </main>
    </div>
  );
};

export default TransactionLimitsPage;
