
import React, { useState, useEffect } from 'react';
import { View, AnimationDirection } from '../App';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { ShareIcon } from '../components/icons/ShareIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import LineChart from '../components/LineChart';
import { BellIcon } from '../components/icons/BellIcon';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { UsdtIcon } from '../components/icons/UsdtIcon';
import { MxnbIcon } from '../components/icons/MxnbIcon';
import { priceHistory, PriceHistoryData } from '../data/priceHistory';


interface ExchangeRateHistoryPageProps {
  onBack: () => void;
  onNavigate: (view: View, direction?: AnimationDirection) => void;
}

const TrendArrow: React.FC<{ up: boolean }> = ({ up }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
        {up ? <path fillRule="evenodd" d="M8 13a.75.75 0 0 1-.75-.75V5.56l-1.72 1.72a.75.75 0 0 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0l3 3a.75.75 0 1 1-1.06 1.06l-1.72-1.72V12.25A.75.75 0 0 1 8 13Z" clipRule="evenodd" /> : <path fillRule="evenodd" d="M8 3a.75.75 0 0 1 .75.75v6.69l1.72-1.72a.75.75 0 0 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V3.75A.75.75 0 0 1 8 3Z" clipRule="evenodd" />}
    </svg>
);

const PriceSkeleton: React.FC = () => <div className="h-9 w-36 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>;
const ChangeSkeleton: React.FC = () => <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mt-1"></div>;
const ChartSkeleton: React.FC = () => <div className="h-48 -mx-4 flex items-center justify-center"><div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div></div>;

const ExchangeRateHistoryPage: React.FC<ExchangeRateHistoryPageProps> = ({ onBack, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('1d');
  const [isLoading, setIsLoading] = useState(true);
  const [activeData, setActiveData] = useState<PriceHistoryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filters = ['1d', '1w', '1m', '6m', '1y', '5y'];

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Simulate a very fast network request to show loading state briefly
    const timer = setTimeout(() => {
      const dataForFilter = priceHistory[activeFilter];
      if (dataForFilter) {
        setActiveData(dataForFilter);
      } else {
        setError("Historical data for this period is not available.");
        setActiveData(null);
      }
      setIsLoading(false);
    }, 150); // 150ms delay for a smooth loading transition

    return () => clearTimeout(timer);
  }, [activeFilter]);
  
  const chartColor = activeData?.trend === 'up' ? '#22c55e' : '#ef4444';

  const formatCurrency = (value: number) => `$${value.toFixed(4)}`;
  const formatChange = (value: number) => `${value >= 0 ? '+' : ''} $${Math.abs(value).toFixed(2)}`;
  
  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <header className="flex-shrink-0 p-4 pt-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full z-10 border-2 border-gray-100 dark:border-black"><UsdtIcon/></div>
              <div className="w-7 h-7 rounded-full -ml-2 border-2 border-gray-100 dark:border-black"><MxnbIcon/></div>
            </div>
            <span className="font-bold text-lg">USDT x MXN</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        </div>
        <button
          className="p-2 -mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Share"
        >
          <ShareIcon className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        {error ? (
           <div className="text-center py-10 text-red-500">
             <p>{error}</p>
           </div>
        ) : (
          <>
            {/* Price Section */}
            <div>
                <div className="flex justify-between items-baseline">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Buy</p>
                        {isLoading || !activeData ? <PriceSkeleton /> : <p className="text-3xl font-bold tracking-tight">{formatCurrency(activeData.buy)}</p>}
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Sell</p>
                        {isLoading || !activeData ? <PriceSkeleton /> : <p className="text-3xl font-bold tracking-tight">{formatCurrency(activeData.sell)}</p>}
                    </div>
                </div>
                {isLoading || !activeData ? <ChangeSkeleton /> : (
                  <div className={`flex items-center text-sm font-semibold mt-1 ${activeData.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      <span>{formatChange(activeData.changeValue)}</span>
                      <TrendArrow up={activeData.trend === 'up'} />
                      <span>{activeData.changePercent.toFixed(2)}%</span>
                      <span className="text-gray-500 font-medium ml-2">&middot; {activeData.periodLabel}</span>
                  </div>
                )}
            </div>
            
            {/* Chart */}
            {isLoading || !activeData ? <ChartSkeleton /> : (
              <div className="h-48 -mx-4">
                 <LineChart data={activeData.chartData} color={chartColor} />
              </div>
            )}

            {/* Filters */}
            <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-800 p-1 rounded-full">
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`flex-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                            activeFilter === filter 
                            ? 'bg-white dark:bg-gray-700 shadow' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                    >
                        {filter.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Alerts Section */}
            <div>
                <h2 className="text-xl font-bold mb-2">Active alerts</h2>
                <button onClick={() => onNavigate('createPriceAlert', 'up')} className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center text-left hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">
                        <BellIcon className="w-6 h-6 text-gray-600 dark:text-gray-300"/>
                    </div>
                    <p className="flex-1 font-semibold">Create new price alert</p>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </button>
            </div>
          </>
        )}
        <div className="h-24"></div> {/* Spacer for bottom button */}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-gray-100 dark:bg-black">
        <button 
            onClick={() => onNavigate('addFunds', 'up')}
            className="w-full bg-green-500 text-white font-bold py-4 text-lg rounded-2xl hover:bg-green-600 transition-colors"
        >
            Add Funds
        </button>
      </footer>
    </div>
  );
};

export default ExchangeRateHistoryPage;
