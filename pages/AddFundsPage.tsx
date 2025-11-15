
import React from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import ReceiveOption from '../components/ReceiveOption';
import IconWithOverlay from '../components/IconWithOverlay';
import { CryptoReceiveIcon } from '../components/icons/CryptoReceiveIcon';
import { PaymentIcon } from '../components/icons/PaymentIcon';
import { View, AnimationDirection } from '../App';

interface AddFundsPageProps {
  onBack: () => void;
  onNavigate: (view: View, direction: AnimationDirection) => void;
}

const AddFundsPage: React.FC<AddFundsPageProps> = ({ onBack, onNavigate }) => {
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">Receive</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">How do you want to add balance to your Zaranda account?</p>
      </header>
      <main className="flex-grow p-4 space-y-6 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm divide-y divide-gray-100 dark:divide-gray-700">
           <ReceiveOption
              icon={
                <IconWithOverlay>
                  <CryptoReceiveIcon className="w-7 h-7 text-blue-500" />
                </IconWithOverlay>
              }
              title="USDT Transfer"
              description="From any exchange or wallet"
              onClick={() => onNavigate('usdtTransfer', 'forward')}
            />
            <ReceiveOption
              icon={
                <IconWithOverlay>
                  <span className="text-3xl">🇺🇸</span>
                </IconWithOverlay>
              }
              title="U.S. dollar transfer"
              description="ACH or Wire transfer"
              onClick={() => onNavigate('achWireTransfer', 'forward')}
            />
             <ReceiveOption
              icon={
                <IconWithOverlay>
                  <span className="text-3xl">🇲🇽</span>
                </IconWithOverlay>
              }
              title="SPEI transfer"
              description="MX bank transfer"
              onClick={() => onNavigate('speiTransfer', 'forward')}
            />
        </div>
        
        <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2 mb-2">
                Request a payment
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <ReceiveOption
                    icon={<PaymentIcon className="w-7 h-7 text-white" />}
                    iconBgColor="bg-green-500"
                    title="Between Zaranda Accounts"
                    description="Request from a friend"
                    onClick={() => onNavigate('requestFromFriend', 'forward')}
                />
            </div>
        </div>
      </main>
      <footer className="p-4 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500">
            Bank transfers are automatically converted to USDT when they are received.
        </p>
      </footer>
    </div>
  );
};

export default AddFundsPage;