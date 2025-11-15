
import React, { useState } from 'react';
import { View, AnimationDirection } from '../App';
import BottomNavBar from '../components/BottomNavBar';
import SendReceiveModal from '../components/SendReceiveModal';
import { InvestingIcon } from '../components/icons/InvestingIcon';

interface InvestingPageProps {
  onNavigate: (view: View, direction?: AnimationDirection) => void;
  activeView: View;
}

const InvestingPage: React.FC<InvestingPageProps> = ({ onNavigate, activeView }) => {
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
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
          
          {/* Hero Section */}
          <div className="relative h-[50vh] bg-cover bg-center text-white flex flex-col justify-end pb-16"
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-0"></div>
            
            {/* Hero Content */}
            <div className="relative z-10 text-center flex flex-col items-center p-6">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                <InvestingIcon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase">Zaranda Investing</h2>
              <h1 className="text-5xl font-extrabold mt-2 tracking-tight">INVEST IN MEXICO</h1>
              <p className="mt-3 text-white/90 max-w-sm">Build a diversified portfolio based on your profile.</p>
            </div>
          </div>

          {/* Content Section */}
          <main className="relative bg-gray-50 dark:bg-gray-900 -mt-8 rounded-t-3xl p-4 z-10 space-y-4">
            {/* How It Works Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">How does it work?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                It's simple. First, you define your investor profile and the level of risk you wish to take. Then, we give you access to a catalog of instruments so you can take control.
              </p>
            </div>

            {/* Available Options Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Available Investment Options</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Low Risk (Focus on Stability & Preservation)</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1 pl-1 space-y-0.5">
                    <li>CETES</li>
                    <li>Bank Promissory Notes</li>
                    <li>SOFIPOs</li>
                  </ul>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Medium Risk (Focus on Growth & Income)</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1 pl-1 space-y-0.5">
                    <li>Investment Funds</li>
                    <li>FIBRAS</li>
                  </ul>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">High Risk (Focus on Long-Term Growth)</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1 pl-1 space-y-0.5">
                    <li>ETFs</li>
                    <li>Individual Stocks</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button className="w-full bg-green-500 text-white font-bold py-4 text-lg rounded-full hover:bg-green-600 transition-colors">
                Start Investing
              </button>
            </div>
          </main>
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

export default InvestingPage;
