
import React, { useState } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { FaceIdIcon } from '../components/icons/FaceIdIcon';
import { PasscodeIcon } from '../components/icons/PasscodeIcon';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import ToggleSwitch from '../components/ToggleSwitch';

interface SecurityPageProps {
  onBack: () => void;
}

const SecurityPage: React.FC<SecurityPageProps> = ({ onBack }) => {
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      <header className="flex-shrink-0 p-4 flex items-center">
        <div className="w-8">
            <button
            onClick={onBack}
            className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Go back"
            >
            <ArrowLeftIcon className="w-6 h-6" />
            </button>
        </div>
        <h1 className="flex-1 text-center text-xl font-bold">Security</h1>
        <div className="w-8" />
      </header>
      
      <main className="flex-grow p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <div className="flex items-center p-3">
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mr-4">
              <FaceIdIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </div>
            <p className="flex-1 font-semibold">Sign in with FaceID</p>
            <ToggleSwitch enabled={biometricsEnabled} onChange={setBiometricsEnabled} />
          </div>
          
          <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mr-4">
              <PasscodeIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </div>
            <p className="flex-1 font-semibold">Change passcode</p>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default SecurityPage;
