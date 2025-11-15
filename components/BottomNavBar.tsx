
import React from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { PayIcon } from './icons/PayIcon';
import { SendIcon } from './icons/SendIcon';
import { InvestingIcon } from './icons/InvestingIcon';
import { LendingIcon } from './icons/LendingIcon';
import { View } from '../App';

interface BottomNavBarProps {
  onSendClick: () => void;
  onNavigate: (view: View) => void;
  activeView: View;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void; }> = ({ icon, label, active = false, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center space-y-1 transition-colors ${active ? 'text-green-500' : 'text-gray-500 dark:text-gray-400 hover:text-green-500'}`}>
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onSendClick, onNavigate, activeView }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 z-40">
      <div className="flex justify-around items-center h-20">
        <NavItem icon={<HomeIcon className="w-6 h-6" />} label="Home" active={activeView === 'home'} onClick={() => onNavigate('home')} />
        <NavItem icon={<PayIcon className="w-6 h-6" />} label="Recipients" active={activeView === 'sendToContact'} onClick={() => onNavigate('sendToContact')} />

        <button 
          onClick={onSendClick}
          className="-mt-8 h-16 w-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-transform transform hover:-translate-y-1"
          aria-label="Send or receive funds"
        >
          <SendIcon className="w-8 h-8 text-white -rotate-45" />
        </button>

        <NavItem icon={<InvestingIcon className="w-6 h-6" />} label="Investing" active={activeView === 'investing'} onClick={() => onNavigate('investing')} />
        <NavItem icon={<LendingIcon className="w-6 h-6" />} label="Lending" active={activeView === 'lending'} onClick={() => onNavigate('lending')} />
      </div>
    </footer>
  );
};

export default BottomNavBar;
