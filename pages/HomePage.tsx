

import React, { useState, useRef, useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';
import BalanceSection from '../components/BalanceSection';
import MainContent from '../components/MainContent';
import BottomNavBar from '../components/BottomNavBar';
import SendReceiveModal from '../components/SendReceiveModal';
import { View, AnimationDirection } from '../App';
import { Wallet } from '../data/wallets';
import { SpinnerIcon } from '../components/icons/SpinnerIcon';

interface HomePageProps {
  onNavigate: (view: View, direction?: AnimationDirection) => void;
  activeWalletIndex: number;
  setActiveWalletIndex: (index: number) => void;
  wallets: Wallet[];
  setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
  activeView: View;
}

const PULL_THRESHOLD = 80;

const HomePage: React.FC<HomePageProps> = ({ onNavigate, activeWalletIndex, setActiveWalletIndex, wallets, setWallets, activeView }) => {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullPosition, setPullPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
        if (el.scrollTop === 0 && !isRefreshing) {
            touchStartY = e.touches[0].clientY;
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (touchStartY > 0) {
            const currentY = e.touches[0].clientY;
            const dy = currentY - touchStartY;
            if (dy > 0) {
                // Prevent browser's native overscroll behavior
                if (el.scrollTop === 0) e.preventDefault();
                setPullPosition(dy);
            }
        }
    };
    
    const handleTouchEnd = () => {
        if (touchStartY > 0) {
            if (pullPosition > PULL_THRESHOLD) {
                setIsRefreshing(true);
                setPullPosition(PULL_THRESHOLD);
                
                // Simulate fetching new balance
                setTimeout(() => {
                    setWallets(currentWallets => currentWallets.map((wallet, index) => {
                        if (index === activeWalletIndex) {
                            return { ...wallet, balance: (Math.random() * 500).toFixed(2) };
                        }
                        return wallet;
                    }));
                    setIsRefreshing(false);
                    setPullPosition(0);
                }, 2000);

            } else {
                setPullPosition(0);
            }
        }
        touchStartY = 0;
    };
    
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd);
    el.addEventListener('touchcancel', handleTouchEnd);
    
    return () => {
        el.removeEventListener('touchstart', handleTouchStart);
        el.removeEventListener('touchmove', handleTouchMove);
        el.removeEventListener('touchend', handleTouchEnd);
        el.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isRefreshing, pullPosition, activeWalletIndex, setWallets]);


  const handleReceiveClick = () => {
    setIsSendModalOpen(false);
    onNavigate('addFunds', 'up');
  };
  
  const handleSendClick = () => {
    setIsSendModalOpen(false);
    onNavigate('send', 'up');
  };

  return (
    <>
      <div className="h-full relative bg-green-500 overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute top-0 left-0 right-0 h-96 bg-green-500 rounded-b-3xl"
          style={{
            transform: `translateY(${(isRefreshing ? PULL_THRESHOLD : pullPosition) * 0.5}px)`,
            transition: pullPosition === 0 || isRefreshing ? 'transform 300ms ease-out' : 'none',
          }}
        />

        <div 
          ref={scrollRef} 
          className="h-full overflow-y-auto no-scrollbar relative"
        >
          {/* Pull to refresh icon */}
          <div
            className="absolute top-6 left-0 right-0 flex justify-center text-white"
            style={{
              opacity: Math.min(pullPosition / PULL_THRESHOLD, 1),
              transition: 'opacity 200ms',
              zIndex: 5,
            }}
          >
            <SpinnerIcon
              className={`w-8 h-8 ${isRefreshing ? 'animate-spin' : ''}`}
              style={{ transform: `rotate(${isRefreshing ? 0 : pullPosition * 2}deg)` }}
            />
          </div>

          {/* Scrollable content wrapper */}
          <div
            className="transition-transform relative"
            style={{
              transform: `translateY(${isRefreshing ? PULL_THRESHOLD : pullPosition}px)`,
              transitionDuration: pullPosition === 0 || isRefreshing ? '300ms' : '0ms',
              zIndex: 10,
            }}
          >
            <div className="flex flex-col min-h-full">
              {/* Header area - now transparent so parallax BG shows through */}
              <div className="relative pb-12 flex-shrink-0">
                <HeaderBar onAccountClick={() => onNavigate('account', 'backward')} onHelpClick={() => onNavigate('chatbot', 'forward')} />
                <BalanceSection
                  onNavigate={onNavigate}
                  activeIndex={activeWalletIndex}
                  setActiveIndex={setActiveWalletIndex}
                  wallets={wallets}
                  isRefreshing={isRefreshing}
                />
              </div>
              {/* White content area */}
              <div className="bg-white dark:bg-gray-900 flex-grow">
                <MainContent onNavigate={onNavigate} />
                <div className="h-24"></div> {/* Spacer for bottom nav */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrim/Overlay */}
      {isSendModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => {
            setIsSendModalOpen(false);
          }}
          aria-hidden="true"
        ></div>
      )}

      {/* Navigation and Modals */}
      <BottomNavBar onSendClick={() => setIsSendModalOpen(true)} onNavigate={onNavigate} activeView={activeView} />
      <SendReceiveModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onReceiveClick={handleReceiveClick}
        onSendClick={handleSendClick}
      />
    </>
  );
};

export default HomePage;
