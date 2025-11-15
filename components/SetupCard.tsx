
import React from 'react';

const CheckmarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const SetupCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center text-gray-800 dark:text-gray-100 font-semibold">
        <CheckmarkIcon className="w-6 h-6 text-green-500 mr-2" />
        <span>Set up your first recipient</span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 my-4">
        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '50%' }}></div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">
        Add your first contact to start sending funds to Mexico instantly. Follow the steps to get started.
      </p>

      <button className="w-full bg-green-500 text-white font-semibold py-3 rounded-full hover:bg-green-600 transition-colors">
        Continue
      </button>
    </div>
  );
};

export default SetupCard;