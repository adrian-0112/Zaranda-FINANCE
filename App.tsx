

import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AddFundsPage from './pages/AddFundsPage';
import ExchangePage from './pages/ExchangePage';
import SendPage from './pages/SendPage';
import TransactionsPage from './pages/TransactionsPage';
import AccountPage from './pages/AccountPage';
import PersonalDetailsPage from './pages/PersonalDetailsPage';
import ExchangeRateHistoryPage from './pages/ExchangeRateHistoryPage';
import CreatePriceAlertPage from './pages/CreatePriceAlertPage';
import UsdtTransferPage from './pages/UsdtTransferPage';
import SpeiTransferPage from './pages/SpeiTransferPage';
import AchWireTransferPage from './pages/AchWireTransferPage';
import RequestFromFriendPage from './pages/RequestFromFriendPage';
import AddMexicanRecipientPage from './pages/AddMexicanRecipientPage';
import AddUsRecipientPage from './pages/AddUsRecipientPage';
import SendToContactPage from './pages/SendToContactPage';
import AccountStatementsPage from './pages/AccountStatementsPage';
import AccountFeesPage from './pages/AccountFeesPage';
import SecurityPage from './pages/SecurityPage';
import ChatbotPage from './pages/ChatbotPage';
import TransactionLimitsPage from './pages/TransactionLimitsPage';
import AddCryptoRecipientPage from './pages/AddCryptoRecipientPage';
import LendingPage from './pages/LendingPage';
import InvestingPage from './pages/InvestingPage';
import LendingOptionsPage from './pages/LendingOptionsPage';
import { wallets as initialWallets, Wallet } from './data/wallets';

export type View = 'home' | 'addFunds' | 'usdtTransfer' | 'speiTransfer' | 'achWireTransfer' | 'exchange' | 'send' | 'transactions' | 'account' | 'personalDetails' | 'exchangeRateHistory' | 'createPriceAlert' | 'requestFromFriend' | 'addMexicanRecipient' | 'addUsRecipient' | 'sendToContact' | 'accountStatements' | 'accountFees' | 'security' | 'chatbot' | 'transactionLimits' | 'addCryptoRecipient' | 'lending' | 'investing' | 'lendingOptions';
export type AnimationDirection = 'forward' | 'backward' | 'up' | 'down' | 'none';

type AnimationState = {
  currentView: View;
  previousView: View | null;
  direction: AnimationDirection;
};

// For directional bottom nav animations
const viewIndices: { [key in View]?: number } = {
    'home': 0,
    'sendToContact': 1,
    // Index 2 is the 'Send' modal button, not a view.
    'investing': 3,
    'lending': 4,
};

const App: React.FC = () => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    currentView: 'home',
    previousView: null,
    direction: 'none',
  });
  const [wallets, setWallets] = useState<Wallet[]>(initialWallets);
  const [activeWalletIndex, setActiveWalletIndex] = useState(0);

  const { currentView, previousView, direction } = animationState;

  // Clean up previous view after animation to remove it from the DOM
  useEffect(() => {
    if (previousView) {
      const isChatbotTransition = currentView === 'chatbot' || previousView === 'chatbot';
      const animationDuration = isChatbotTransition ? 0 : 500;

      const timer = setTimeout(() => {
        setAnimationState((s) => ({ ...s, previousView: null, direction: 'none' }));
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [previousView, currentView]);

  const navigate = (view: View, direction: AnimationDirection = 'forward') => {
    if (view === currentView) return; // Do nothing if tapping the same tab

    const currentIndex = viewIndices[currentView];
    const targetIndex = viewIndices[view];

    let newDirection = direction;

    // If navigating between main bottom nav tabs, determine direction
    if (currentIndex !== undefined && targetIndex !== undefined) {
        newDirection = targetIndex > currentIndex ? 'forward' : 'backward';
    }

    setAnimationState({
        currentView: view,
        previousView: currentView,
        direction: newDirection,
    });
  };

  const goBack = () => {
    const backMapping: { [key in View]?: View } = {
        addFunds: 'home',
        usdtTransfer: 'addFunds',
        speiTransfer: 'addFunds',
        achWireTransfer: 'addFunds',
        requestFromFriend: 'addFunds',
        exchange: 'home',
        send: 'home',
        addMexicanRecipient: 'send',
        addUsRecipient: 'send',
        addCryptoRecipient: 'send',
        transactions: 'home',
        account: 'home',
        personalDetails: 'account',
        accountStatements: 'account',
        accountFees: 'account',
        security: 'account',
        transactionLimits: 'account',
        exchangeRateHistory: 'home',
        createPriceAlert: 'exchangeRateHistory',
        chatbot: 'home',
        investing: 'home',
        lending: 'home',
        sendToContact: 'home',
        lendingOptions: 'lending',
    };
    const targetView = backMapping[currentView] || 'home';

    if (currentView !== 'home') {
      let backDirection: AnimationDirection;

      // Determine animation direction for non-tab views
      if (currentView === 'addFunds' || currentView === 'send' || currentView === 'createPriceAlert') {
          backDirection = 'down';
      } else if (currentView === 'account') {
          backDirection = 'forward';
      } else {
          backDirection = 'backward';
      }
      
      // Override for main tab views to ensure correct animation back to home
      if (viewIndices[currentView] !== undefined && targetView === 'home') {
          backDirection = 'backward';
      }

      setAnimationState({
        currentView: targetView,
        previousView: currentView,
        direction: backDirection,
      });
    }
  };

  const renderPage = (view: View) => {
    switch (view) {
      case 'home':
        return <HomePage 
                  onNavigate={navigate} 
                  activeWalletIndex={activeWalletIndex} 
                  setActiveWalletIndex={setActiveWalletIndex}
                  wallets={wallets}
                  setWallets={setWallets}
                  activeView={currentView}
                />;
      case 'addFunds':
        return <AddFundsPage onBack={goBack} onNavigate={navigate} />;
      case 'usdtTransfer':
        return <UsdtTransferPage onBack={goBack} />;
      case 'speiTransfer':
        return <SpeiTransferPage onBack={goBack} />;
      case 'achWireTransfer':
        return <AchWireTransferPage onBack={goBack} />;
      case 'requestFromFriend':
        return <RequestFromFriendPage onBack={goBack} />;
      case 'exchange':
        return <ExchangePage onBack={goBack} wallets={wallets} setWallets={setWallets} />;
      case 'send':
        return <SendPage onBack={goBack} onNavigate={navigate} />;
      case 'addMexicanRecipient':
        return <AddMexicanRecipientPage onBack={goBack} />;
      case 'addUsRecipient':
        return <AddUsRecipientPage onBack={goBack} />;
      case 'addCryptoRecipient':
        return <AddCryptoRecipientPage onBack={goBack} />;
      case 'sendToContact':
        return <SendToContactPage onNavigate={navigate} activeView={currentView} />;
      case 'transactions':
        return <TransactionsPage onBack={goBack} activeWalletIndex={activeWalletIndex} />;
      case 'account':
        return <AccountPage onBack={goBack} onNavigate={navigate} />;
      case 'personalDetails':
        return <PersonalDetailsPage onBack={goBack} />;
      case 'accountStatements':
        return <AccountStatementsPage onBack={goBack} />;
      case 'accountFees':
        return <AccountFeesPage onBack={goBack} />;
      case 'security':
        return <SecurityPage onBack={goBack} />;
      case 'transactionLimits':
        return <TransactionLimitsPage onBack={goBack} />;
      case 'exchangeRateHistory':
        return <ExchangeRateHistoryPage onBack={goBack} onNavigate={navigate} />;
      case 'createPriceAlert':
        return <CreatePriceAlertPage onBack={goBack} />;
      case 'chatbot':
        return <ChatbotPage onBack={goBack} />;
      case 'lending':
        return <LendingPage onNavigate={navigate} activeView={currentView} />;
      case 'investing':
        return <InvestingPage onNavigate={navigate} activeView={currentView} />;
      case 'lendingOptions':
        return <LendingOptionsPage onBack={goBack} />;
      default:
        return null;
    }
  };

  const getAnimationClass = (isPrevious: boolean) => {
    const isChatbotTransition = currentView === 'chatbot' || previousView === 'chatbot';
    if (direction === 'none' || isChatbotTransition) return '';
  
    if (isPrevious) { // Exiting view
      switch (direction) {
        case 'forward': return 'animate-slide-out-left';
        case 'backward': return 'animate-slide-out-right';
        case 'up': return 'animate-scale-down-fade-out';
        case 'down': return 'animate-slide-out-down';
        default: return '';
      }
    } else { // Entering view
      switch (direction) {
        case 'forward': return 'animate-slide-in-right';
        case 'backward': return 'animate-slide-in-left';
        case 'up': return 'animate-slide-in-up';
        case 'down': return 'animate-scale-up-fade-in';
        default: return '';
      }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen font-sans">
      <div className="relative mx-auto max-w-md w-full bg-white shadow-lg h-screen overflow-hidden">
        {/* Render previous view for exit animation */}
        {previousView && (
          <div
            key={previousView}
            className={`absolute inset-0 w-full h-full ${getAnimationClass(true)}`}
          >
            {renderPage(previousView)}
          </div>
        )}
        {/* Render current view */}
        <div
          key={currentView}
          className={`absolute inset-0 w-full h-full ${getAnimationClass(false)}`}
        >
          {renderPage(currentView)}
        </div>
      </div>
    </div>
  );
};

export default App;
