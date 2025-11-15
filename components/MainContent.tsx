
import React from 'react';
import SetupCard from './SetupCard';
import PromoCard from './PromoCard';
import ExchangeRateCard from './ExchangeRateCard';
import { View, AnimationDirection } from '../App';

interface MainContentProps {
  onNavigate?: (view: View, direction?: AnimationDirection) => void;
}

const MainContent: React.FC<MainContentProps> = ({ onNavigate }) => {
  return (
    <main className="relative bg-white dark:bg-gray-900 -mt-8 rounded-t-3xl p-4 space-y-4 z-10">
      <SetupCard />
      <ExchangeRateCard onNavigate={onNavigate} />
      <PromoCard />
    </main>
  );
};

export default MainContent;
