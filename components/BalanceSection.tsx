
import React, { useState, useEffect, useRef } from 'react';
import { ActivityIcon } from './icons/ActivityIcon';
import { ExchangeIcon } from './icons/ExchangeIcon';
import { View } from '../App';
import { Wallet } from '../data/wallets';

interface BalanceSectionProps {
  onNavigate: (view: View) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  wallets: Wallet[];
  isRefreshing?: boolean;
}

const WalletSlide: React.FC<{ wallet: Wallet; isRefreshing: boolean }> = ({ wallet, isRefreshing }) => {
  const [animatedBalance, setAnimatedBalance] = useState(wallet.balance);
  const prevIsRefreshingRef = useRef(isRefreshing);
  const animationFrameId = useRef<number | null>(null);
  const balanceToAnimateFromRef = useRef(animatedBalance);

  useEffect(() => {
    balanceToAnimateFromRef.current = animatedBalance;
  }, [animatedBalance]);

  useEffect(() => {
    let randomizerIntervalId: number | undefined;

    const cleanup = () => {
      if (randomizerIntervalId) clearInterval(randomizerIntervalId);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
    
    const justStartedRefreshing = isRefreshing && !prevIsRefreshingRef.current;
    const justStoppedRefreshing = !isRefreshing && prevIsRefreshingRef.current;

    if (justStartedRefreshing) {
      cleanup();
      randomizerIntervalId = window.setInterval(() => {
        const randomBalance = (Math.random() * (parseFloat(wallet.balance) + 250)).toFixed(2);
        setAnimatedBalance(randomBalance);
      }, 80);
    } 
    else if (justStoppedRefreshing) {
      cleanup();
      const startBalance = parseFloat(balanceToAnimateFromRef.current);
      const finalBalance = parseFloat(wallet.balance);
      const duration = 500;
      let startTime: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const t = Math.min(progress / duration, 1);
        const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        const currentAnimatedValue = startBalance + (finalBalance - startBalance) * easedT;
        setAnimatedBalance(currentAnimatedValue.toFixed(2));

        if (progress < duration) {
          animationFrameId.current = requestAnimationFrame(animate);
        } else {
          setAnimatedBalance(finalBalance.toFixed(2));
        }
      };
      animationFrameId.current = requestAnimationFrame(animate);
    } 
    else if (!isRefreshing) {
      cleanup();
      if (animatedBalance !== wallet.balance) {
        setAnimatedBalance(wallet.balance);
      }
    }

    prevIsRefreshingRef.current = isRefreshing;
    return cleanup;
  }, [isRefreshing, wallet.balance]);

  return (
    <div className="w-full flex-shrink-0 text-center px-4">
      <div className="my-4">
        <div className="h-14 flex items-center justify-center">
            <h1 className="text-5xl font-bold tracking-tight w-52 text-center" style={{fontVariantNumeric: 'tabular-nums'}}>
                ${animatedBalance}
            </h1>
        </div>
        <p className="mt-2 text-white/80 font-medium">
          {wallet.flag} {wallet.name} &middot; {wallet.currency}
        </p>
      </div>
    </div>
  );
};


const BalanceSection: React.FC<BalanceSectionProps> = ({ onNavigate, activeIndex, setActiveIndex, wallets, isRefreshing = false }) => {
  const [slideOffset, setSlideOffset] = useState(0);
  const touchStartXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.touches[0].clientX;
    const offset = currentX - touchStartXRef.current;
    setSlideOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    
    const swipeThreshold = 50; // pixels

    if (slideOffset < -swipeThreshold) { // Swiped left
      if (activeIndex < wallets.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    } else if (slideOffset > swipeThreshold) { // Swiped right
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    }
    
    setSlideOffset(0); // Snap back to the correct position
  };
  
  return (
    <div className="text-white">
      <div 
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex"
          style={{
            width: `${wallets.length * 100}%`,
            transform: `translateX(calc(-${activeIndex * (100 / wallets.length)}% + ${slideOffset}px))`,
            transition: isDraggingRef.current ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          }}
        >
          {wallets.map((wallet, index) => (
            <div key={wallet.currency} style={{ width: `${100 / wallets.length}%` }}>
              <WalletSlide
                wallet={wallet}
                isRefreshing={isRefreshing && index === activeIndex}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-4">
          <div className="flex justify-center space-x-2 mt-4">
            {wallets.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'w-4 bg-white' : 'bg-white/40'
                }`}
                aria-label={`Go to wallet ${index + 1}`}
              ></button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button 
              onClick={() => onNavigate('transactions')}
              className="bg-white text-green-600 font-semibold py-3 px-6 rounded-full flex items-center justify-center space-x-2 shadow-md hover:bg-gray-100 transition-colors">
              <ActivityIcon className="w-5 h-5" />
              <span>Transactions</span>
            </button>
            <button 
              onClick={() => onNavigate('exchange')}
              className="bg-white/20 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center space-x-2 border border-white/30 hover:bg-white/30 transition-colors">
              <ExchangeIcon className="w-5 h-5" />
              <span>Swap</span>
            </button>
          </div>
      </div>
    </div>
  );
};

export default BalanceSection;
