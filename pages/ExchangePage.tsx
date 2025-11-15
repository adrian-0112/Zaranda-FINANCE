
import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { TrendUpIcon } from '../components/icons/TrendUpIcon';
import { SwapArrowsIcon } from '../components/icons/SwapArrowsIcon';
import { Wallet } from '../data/wallets';

interface ExchangePageProps {
  onBack: () => void;
  wallets: Wallet[];
  setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
}

const EXCHANGE_RATE_USDT_TO_MXNB = 18.45;

const ConfirmationDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fromAmount: string;
  toAmount: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}> = ({ isOpen, onClose, onConfirm, fromAmount, toAmount, fromCurrency, toCurrency, rate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-scale-up-fade-in" onClick={onClose}>
      <div className="bg-[#2C2C2E] rounded-2xl w-full max-w-sm p-6 text-white space-y-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center">Confirm Exchange</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-baseline">
            <span className="text-gray-400">You send</span>
            <span className="font-semibold text-lg">{fromAmount} {fromCurrency}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-gray-400">You receive</span>
            <span className="font-semibold text-lg text-green-400">≈ {toAmount} {toCurrency}</span>
          </div>
          <div className="border-b border-white/10 my-4 pt-2"></div>
          <div className="flex justify-between">
            <span className="text-gray-400">Rate</span>
            <span className="font-medium">1 {fromCurrency} ≈ {rate.toFixed(2)} {toCurrency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Fee</span>
            <span className="font-medium text-green-400">No fees</span>
          </div>
        </div>

        <div className="flex space-x-3 pt-2">
          <button onClick={onClose} className="w-full font-semibold py-3 rounded-xl bg-[#3A3A3C] hover:bg-[#48484A] transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="w-full font-semibold py-3 rounded-xl bg-green-500 hover:bg-green-600 transition-colors">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const ExchangePage: React.FC<ExchangePageProps> = ({ onBack, wallets, setWallets }) => {
  const [fromCurrency, setFromCurrency] = useState<'USDT' | 'MXNB'>('USDT');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [error, setError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);


  const toCurrency = fromCurrency === 'USDT' ? 'MXNB' : 'USDT';

  const usdtWallet = wallets.find(w => w.currency === 'USDT');
  const mxnbWallet = wallets.find(w => w.currency === 'MXNB');

  const fromWallet = fromCurrency === 'USDT' ? usdtWallet : mxnbWallet;

  useEffect(() => {
    const amount = parseFloat(fromAmount);
    if (!isNaN(amount) && amount > 0) {
      if (fromCurrency === 'USDT') {
        setToAmount((amount * EXCHANGE_RATE_USDT_TO_MXNB).toFixed(2));
      } else {
        setToAmount((amount / EXCHANGE_RATE_USDT_TO_MXNB).toFixed(2));
      }
    } else {
      setToAmount('');
    }

    if (fromWallet && amount > parseFloat(fromWallet.balance)) {
      setError('Insufficient funds');
    } else {
      setError('');
    }
  }, [fromAmount, fromCurrency, fromWallet]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setFromAmount(value);
    }
  };
  
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setFromAmount(toAmount);
  };
  
  const handleConfirmExchange = () => {
    const fromVal = parseFloat(fromAmount);
    const toVal = parseFloat(toAmount);

    if (!fromWallet || !wallets.find(w => w.currency === toCurrency) || isNaN(fromVal) || fromVal <= 0) {
        return;
    }
    
    if (fromVal > parseFloat(fromWallet.balance)) {
        setError('Insufficient funds');
        return;
    }

    setWallets(currentWallets => 
        currentWallets.map(wallet => {
            if (wallet.currency === fromCurrency) {
                return { ...wallet, balance: (parseFloat(wallet.balance) - fromVal).toFixed(2) };
            }
            if (wallet.currency === toCurrency) {
                return { ...wallet, balance: (parseFloat(wallet.balance) + toVal).toFixed(2) };
            }
            return wallet;
        })
    );
    
    setIsConfirming(false);
    onBack();
  };

  const currencyDetails = {
    USDT: { symbol: 'USDT', flag: '🇺🇸', balance: `${usdtWallet?.balance || '0.00'} USDT` },
    MXNB: { symbol: 'MXNB', flag: '🇲🇽', balance: `${mxnbWallet?.balance || '0.00'} MXNB` },
  };

  const fromInfo = currencyDetails[fromCurrency];
  const toInfo = currencyDetails[toCurrency];
  
  const isExchangeDisabled = !fromAmount || parseFloat(fromAmount) <= 0 || !!error;

  return (
    <div className="flex flex-col h-full bg-[#1C1C1E] text-white">
      <header className="flex-shrink-0 p-4 pt-6">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div className="mt-4">
          <h1 className="text-4xl font-bold">Exchange</h1>
          <div className="flex items-center space-x-2 mt-2 text-green-400 font-medium">
            <TrendUpIcon className="w-5 h-5" />
            <span>1 USDT = {EXCHANGE_RATE_USDT_TO_MXNB} MXNB</span>
          </div>
        </div>
      </header>

      <main className="flex-grow px-4 flex flex-col justify-center relative">
        <div className="space-y-2 relative">
            {/* From Card */}
            <div className="bg-[#2C2C2E] p-4 rounded-xl">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <span className="text-3xl">{fromInfo.flag}</span>
                        <div>
                            <p className="text-xl font-semibold">{fromInfo.symbol}</p>
                            <p className="text-sm text-gray-400">Balance: {fromInfo.balance}</p>
                        </div>
                    </div>
                    <input 
                        type="text"
                        value={fromAmount}
                        onChange={handleAmountChange}
                        placeholder="0"
                        className="text-2xl font-semibold bg-transparent text-right w-36 focus:outline-none"
                        aria-label="Amount to exchange from"
                    />
                </div>
            </div>

            {/* Swap Button & Error */}
            <div className="h-5 flex justify-center items-center">
                <div className="absolute left-4">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <button 
                      onClick={handleSwap}
                      className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors"
                      aria-label="Swap currencies"
                    >
                        <SwapArrowsIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* To Card */}
            <div className="bg-[#2C2C2E] p-4 rounded-xl">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <span className="text-3xl">{toInfo.flag}</span>
                        <div>
                            <p className="text-xl font-semibold">{toInfo.symbol}</p>
                            <p className="text-sm text-gray-400">Balance: {toInfo.balance}</p>
                        </div>
                    </div>
                    <input 
                        type="text"
                        value={toAmount ? `+ ${toAmount}` : ''}
                        readOnly
                        placeholder="0"
                        className="text-2xl font-semibold bg-transparent text-right w-36 focus:outline-none text-green-400"
                        aria-label="Amount to receive"
                    />
                </div>
            </div>
        </div>
      </main>

      <footer className="p-4">
        <p className="text-center text-sm text-gray-400 mb-3">Est. delivery: Instant</p>
        <button 
          onClick={() => setIsConfirming(true)}
          disabled={isExchangeDisabled}
          className={`w-full font-semibold py-4 rounded-2xl text-lg transition-colors ${
            isExchangeDisabled 
            ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
            : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          Exchange {fromCurrency} to {toCurrency}
        </button>
      </footer>
      
      <ConfirmationDialog
        isOpen={isConfirming}
        onClose={() => setIsConfirming(false)}
        onConfirm={handleConfirmExchange}
        fromAmount={fromAmount}
        toAmount={toAmount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        rate={fromCurrency === 'USDT' ? EXCHANGE_RATE_USDT_TO_MXNB : 1 / EXCHANGE_RATE_USDT_TO_MXNB}
      />
    </div>
  );
};

export default ExchangePage;
