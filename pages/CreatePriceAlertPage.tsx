
import React, { useState } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import CurrencyPairLogo from '../components/icons/CurrencyPairLogo';
import { NotificationIcon } from '../components/icons/NotificationIcon';
import { MailIcon } from '../components/icons/MailIcon';
import ToggleSwitch from '../components/ToggleSwitch';

interface CreatePriceAlertPageProps {
  onBack: () => void;
}

const CreatePriceAlertPage: React.FC<CreatePriceAlertPageProps> = ({ onBack }) => {
  const [price, setPrice] = useState('');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const currentPrice = 18.4517;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,4}$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black">
      <header className="flex-shrink-0 p-4 pt-6">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 ml-4">Create price alert</h1>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Currency Pair */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <CurrencyPairLogo />
            <div>
              <p className="font-bold text-lg text-gray-800 dark:text-gray-100">USDT/MXNB</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current price: ${currentPrice}</p>
            </div>
          </div>
        </div>

        {/* Price Target */}
        <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2 mb-2">
                Set a price target
            </h2>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">$</span>
              <input 
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="0.0000"
                className="w-full text-center text-4xl font-bold bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 focus:ring-green-500 focus:border-green-500 transition"
                aria-label="Price target"
              />
            </div>
        </div>

        {/* Notification Preferences */}
        <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2 mb-2">
                Notification preferences
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                <div className="flex items-center p-4">
                    <NotificationIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-4" />
                    <div className="flex-1">
                        <p className="font-semibold text-gray-800 dark:text-gray-100">Push notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive an alert on this device.</p>
                    </div>
                    <ToggleSwitch enabled={pushEnabled} onChange={setPushEnabled} />
                </div>
                <div className="flex items-center p-4">
                    <MailIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-4" />
                    <div className="flex-1">
                        <p className="font-semibold text-gray-800 dark:text-gray-100">Email</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive an alert to your email.</p>
                    </div>
                    <ToggleSwitch enabled={emailEnabled} onChange={setEmailEnabled} />
                </div>
            </div>
        </div>

      </main>

      <footer className="p-4 bg-gray-50 dark:bg-black">
        <button 
            onClick={onBack}
            disabled={!price || parseFloat(price) <= 0}
            className="w-full bg-green-500 text-white font-bold py-4 text-lg rounded-2xl hover:bg-green-600 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
            Create Alert
        </button>
      </footer>
    </div>
  );
};

export default CreatePriceAlertPage;
