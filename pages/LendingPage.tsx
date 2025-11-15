
import React, { useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import SendReceiveModal from '../components/SendReceiveModal';
import { View, AnimationDirection } from '../App';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { ZarandaIcon } from '../components/icons/ZarandaIcon';

interface LendingPageProps {
  onNavigate: (view: View, direction?: AnimationDirection) => void;
  activeView: View;
}

const LendingPage: React.FC<LendingPageProps> = ({ onNavigate, activeView }) => {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

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
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800">
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
            {/* Hero Image Section */}
            <div 
                className="relative h-96 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white text-center">
                    <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                       <ZarandaIcon className="w-4 h-4" />
                       <span className="text-sm font-semibold">Zaranda Lending</span>
                    </div>
                    <h1 className="text-5xl font-bold tracking-tighter leading-none">Find Your Ideal Credit in Mexico</h1>
                    <p className="mt-3 text-white/80 max-w-sm text-base">
                      Zaranda is a loan comparator for the Mexican market. We find the best options for your profile by comparing rates, terms, and requirements, using an advanced algorithm to show which loans you're most likely to be approved for.
                    </p>
                </div>
            </div>
            
            {/* Main Content Area */}
            <div className="relative bg-gray-50 dark:bg-gray-800 -mt-8 rounded-t-3xl p-4 z-10 space-y-4">
                <button className="w-full bg-white dark:bg-gray-900 rounded-2xl p-5 flex justify-between items-center shadow-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex-1 pr-4">
                        <h2 className="text-3xl font-bold text-green-500">We Do the Work for You</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-base mt-1">
                            Compare rates, terms, and see your eligibility.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                       <ChevronRightIcon className="w-6 h-6 text-gray-400" />
                    </div>
                </button>

                {/* Action Button */}
                <div className="pt-4">
                    <button 
                        onClick={() => onNavigate('lendingOptions', 'forward')}
                        className="w-full bg-green-500 text-white font-bold py-4 rounded-full hover:bg-green-600 transition-colors text-lg">
                        Get started
                    </button>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                        Rates starting from 8.9% APR
                    </p>
                </div>
            </div>
        </div>
    </div>
    
      {/* Scrim/Overlay */}
      {isSendModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setIsSendModalOpen(false)}
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

export default LendingPage;
