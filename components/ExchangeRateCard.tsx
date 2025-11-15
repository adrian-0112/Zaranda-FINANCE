
import React from 'react';
import { TrendUpIcon } from './icons/TrendUpIcon';
import { DotsVerticalIcon } from './icons/DotsVerticalIcon';
import CurrencyPairLogo from './icons/CurrencyPairLogo';
import { View, AnimationDirection } from '../App';

interface ExchangeRateCardProps {
  onNavigate?: (view: View, direction?: AnimationDirection) => void;
}

const ExchangeRateCard: React.FC<ExchangeRateCardProps> = ({ onNavigate }) => {
  const handlePress = () => {
    onNavigate?.('exchangeRateHistory', 'forward');
  };

  return (
    <div 
      onClick={handlePress} 
      className={`bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center shadow-sm border border-gray-100 dark:border-gray-700 ${onNavigate ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors' : ''}`}
    >
      {/* Left Section */}
      <div className="flex-1 flex items-center space-x-3">
        <CurrencyPairLogo />
        <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm md:text-base">USDT/MXNB</p>
            <div className="flex items-center text-sm text-green-500 font-medium">
                <TrendUpIcon className="w-4 h-4 mr-1" />
                <span>+0.00%</span>
            </div>
        </div>
      </div>

      {/* Middle Section - Buy */}
      <div className="text-right px-2">
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm md:text-base">$18.4614</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Buy</p>
      </div>

      {/* Right Section - Sell */}
      <div className="text-right pl-2">
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm md:text-base">$18.4314</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Sell</p>
      </div>

      {/* Far Right - Menu */}
      <div className="pl-3">
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <DotsVerticalIcon className="w-5 h-5" />
          </button>
      </div>
    </div>
  );
};

export default ExchangeRateCard;
