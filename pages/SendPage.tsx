
import React from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import SendOption from '../components/SendOption';
import { CryptoWalletIcon } from '../components/icons/CryptoWalletIcon';
import { ZarandaIcon } from '../components/icons/ZarandaIcon';
import { View } from '../App';

interface SendPageProps {
  onBack: () => void;
  onNavigate: (view: View) => void;
}

const SendPage: React.FC<SendPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black">
      <header className="flex-shrink-0 bg-gray-50 dark:bg-black p-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">Send</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">How do you want to send funds?</p>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm divide-y divide-gray-100 dark:divide-gray-700">
          <SendOption
            icon={<span className="text-3xl">🇲🇽</span>}
            title="Mexico bank transfer"
            description="Send MXNB to any bank account"
            deliveryTime="Est. delivery: 1-3 business days"
            onClick={() => onNavigate('addMexicanRecipient')}
          />
          <SendOption
            icon={<span className="text-3xl">🇺🇸</span>}
            title="U.S. dollar transfer"
            description="Send USDT to U.S. accounts"
            deliveryTime="Est. delivery: 1-3 business days"
            onClick={() => onNavigate('addUsRecipient')}
          />
          <SendOption
            icon={<CryptoWalletIcon className="w-7 h-7 text-gray-600 dark:text-gray-300" />}
            title="Cryptocurrency"
            description="Send USDT to any external wallet"
            deliveryTime="Est. delivery: 5-10 minutes"
            onClick={() => onNavigate('addCryptoRecipient')}
          />
          <SendOption
            icon={<ZarandaIcon className="w-7 h-7 text-gray-600 dark:text-gray-300" />}
            title="Zaranda Transfer"
            description="Send funds instantly to any Zaranda account"
            deliveryTime="Est. delivery: Instant"
            onClick={() => onNavigate('sendToContact')}
          />
        </div>
      </main>
    </div>
  );
};

export default SendPage;
