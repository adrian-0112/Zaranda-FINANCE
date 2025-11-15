import React, { useState } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { wallets } from '../data/wallets';
import { StatementIcon } from '../components/icons/StatementIcon';
import { RefreshIcon } from '../components/icons/RefreshIcon';
import { ArrowDownIcon } from '../components/icons/ArrowDownIcon';
import { ArrowUpIcon } from '../components/icons/ArrowUpIcon';
import { ExchangeIcon } from '../components/icons/ExchangeIcon';
import { UsdtIcon } from '../components/icons/UsdtIcon';
import { MxnbIcon } from '../components/icons/MxnbIcon';
import DatePicker from '../components/DatePicker';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ActivityIcon } from '../components/icons/ActivityIcon';

interface TransactionsPageProps {
  onBack: () => void;
  activeWalletIndex: number;
}

// Mock data
const transactionsData = {
  USDT: [
    { type: 'send', title: 'Sent to 0x123...abc', date: 'November 09', amount: -50.00, currency: 'USDT' },
    { type: 'receive', title: 'Received from Boveda', date: 'November 09', amount: 150.00, currency: 'USDT' },
    { type: 'swap', title: 'Swap to MXNB', date: 'November 08', amount: -25.50, currency: 'USDT' },
    { type: 'send', title: 'Sent to Friend', date: 'November 07', amount: -10.00, currency: 'USDT' },
  ],
  MXNB: [
    { type: 'send', title: 'CARGO AUNTAPI MEXICO S DE RL DE CV', date: 'November 08', amount: -150.00, currency: 'MXN' },
    { type: 'receive', title: 'Pago desde Bóveda', date: 'November 08', amount: 150.00, currency: 'MXN' },
    { type: 'send', title: 'CARGO EN TRANSITO AVAST *AVP1649444476', date: 'November 07', amount: 0.00, currency: 'MXN' },
    { type: 'send', title: 'CARGO OPERADORA LONA S.A. DE C.V.', date: 'November 07', amount: -33.50, currency: 'MXN' },
  ]
};

const TransactionIcon: React.FC<{ type: string }> = ({ type }) => {
    switch (type) {
        case 'send':
            return <ArrowUpIcon className="w-5 h-5 text-gray-800 dark:text-gray-300" />;
        case 'receive':
            return <ArrowDownIcon className="w-5 h-5 text-green-500" />;
        case 'swap':
             return <ExchangeIcon className="w-5 h-5 text-blue-500" />;
        default:
             return <div className="w-5 h-5" />;
    }
}

const TransactionSkeleton: React.FC = () => (
    <div className="flex items-center py-4 animate-pulse">
        <div className="w-8 flex justify-center">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="flex-grow ml-3 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="text-right w-24 space-y-2">
             <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full ml-auto"></div>
        </div>
    </div>
);

const TransactionsPage: React.FC<TransactionsPageProps> = ({ onBack, activeWalletIndex }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [untilDate, setUntilDate] = useState<Date | null>(null);
    const [datePickerFor, setDatePickerFor] = useState<'from' | 'until' | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const wallet = wallets[activeWalletIndex];
    const transactions = transactionsData[wallet.currency];

    const filters = ["All", "Deposits", "Swaps", "Sends"];

    const formatDate = (date: Date | null): string => {
        if (!date) return 'Select Date';
        // Format to "Oct / 25 / 2025"
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date).replace(/, /g, ' / ');
    }

    const handleRefresh = () => {
        setIsLoading(true);
        // Simulate fetching data based on current filters
        setTimeout(() => {
            // In a real app, you would re-fetch data here.
            // Since our data is static, we just simulate the delay.
            setIsLoading(false);
        }, 1500); // 1.5 second delay
    };
    
    const handleSelectDate = (date: Date) => {
        if (datePickerFor === 'from') {
            setFromDate(date);
        } else if (datePickerFor === 'until') {
            setUntilDate(date);
        }
        setDatePickerFor(null);
    };

    const filteredTransactions = transactions.filter(t => {
        // Filter by type
        const typeMatch = activeFilter === 'All' ||
            (activeFilter === 'Deposits' && t.type === 'receive') ||
            (activeFilter === 'Swaps' && t.type === 'swap') ||
            (activeFilter === 'Sends' && t.type === 'send');
        
        if (!typeMatch) return false;

        // Filter by date (assume year 2025 for mock data)
        const txDate = new Date(`${t.date}, 2025`);
        
        const from = fromDate ? new Date(new Date(fromDate).setHours(0,0,0,0)) : null;
        const until = untilDate ? new Date(new Date(untilDate).setHours(23,59,59,999)) : null;
        
        if (from && txDate < from) return false;
        if (until && txDate > until) return false;

        // Filter by search query
        if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        return true;
    });

    return (
        <div className="flex flex-col h-full bg-white dark:bg-black text-gray-900 dark:text-gray-100">
            <header className="flex-shrink-0 p-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        aria-label="Go back"
                    >
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold absolute left-1/2 -translate-x-1/2">{`${wallet.currency} Transactions`}</h1>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar">
                <main className="p-4 space-y-6">
                    {/* Wallet Summary */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex justify-between items-center border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                                <span className="text-4xl">{wallet.flag}</span>
                                {wallet.currency === 'USDT' ? 
                                    <UsdtIcon className="w-10 h-10 ml-2" /> : 
                                    <MxnbIcon className="w-10 h-10 ml-2" />
                                }
                            </div>
                            <div>
                                <p className="text-xl font-bold">{wallet.balance} <span className="text-gray-500 dark:text-gray-400 font-normal">{wallet.currency}</span></p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{wallet.name} Wallet</p>
                            </div>
                        </div>
                        <button className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white space-y-1">
                            <StatementIcon className="w-7 h-7" />
                            <span className="text-xs font-medium">Periodic statement</span>
                        </button>
                    </div>
                    
                    {/* Date Filter */}
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            <label htmlFor="from-date-button" className="text-xs text-gray-500 dark:text-gray-400">From:</label>
                            <button id="from-date-button" onClick={() => setDatePickerFor('from')} className="w-full text-left bg-transparent text-sm font-semibold focus:outline-none h-5" disabled={isLoading}>
                               {formatDate(fromDate)}
                            </button>
                        </div>
                        <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            <label htmlFor="until-date-button" className="text-xs text-gray-500 dark:text-gray-400">Until:</label>
                            <button id="until-date-button" onClick={() => setDatePickerFor('until')} className="w-full text-left bg-transparent text-sm font-semibold focus:outline-none h-5" disabled={isLoading}>
                               {formatDate(untilDate)}
                            </button>
                        </div>
                        <button onClick={handleRefresh} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Refresh transactions" disabled={isLoading}>
                            <RefreshIcon className={`w-6 h-6 text-gray-600 dark:text-gray-300 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    {/* Transaction Type Filters */}
                    <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
                        <div className="flex space-x-2 pb-2">
                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                                        activeFilter === filter ? 'bg-gray-900 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                    disabled={isLoading}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or description"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-gray-900 focus:border-gray-900"
                            aria-label="Search transactions"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Transaction List */}
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {isLoading ? (
                            <>
                                <TransactionSkeleton />
                                <TransactionSkeleton />
                                <TransactionSkeleton />
                                <TransactionSkeleton />
                                <TransactionSkeleton />
                            </>
                        ) : filteredTransactions.length > 0 ? (
                             filteredTransactions.map((tx, index) => (
                                <div key={index} className="flex items-center py-4">
                                    <div className="w-8 flex justify-center">
                                        <TransactionIcon type={tx.type} />
                                    </div>
                                    <div className="flex-grow ml-3">
                                        <p className="font-semibold text-sm uppercase">{tx.title}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{tx.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold text-sm whitespace-nowrap ${tx.amount >= 0 ? 'text-green-600' : 'text-gray-900 dark:text-gray-100'}`}>
                                            {tx.amount > 0 && '+'}{tx.amount.toFixed(2)}
                                            <span className="text-gray-500 dark:text-gray-400 ml-1">{tx.currency}</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16 px-4">
                                <div className="mx-auto w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                                    <ActivityIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">No Transactions Found</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                                    Your transactions will appear here once you make them.
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
             <DatePicker 
                isOpen={datePickerFor !== null}
                onClose={() => setDatePickerFor(null)}
                onSelectDate={handleSelectDate}
                minDate={datePickerFor === 'until' ? fromDate ?? undefined : undefined}
                maxDate={datePickerFor === 'from' ? untilDate ?? undefined : undefined}
            />
        </div>
    );
};

export default TransactionsPage;