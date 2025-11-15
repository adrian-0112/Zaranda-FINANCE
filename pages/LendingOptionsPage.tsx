import React, { useState } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { CashIcon } from '../components/icons/CashIcon';
import { HomeIcon } from '../components/icons/HomeIcon';
import { CarIcon } from '../components/icons/CarIcon';
import { PayIcon } from '../components/icons/PayIcon';
import { BriefcaseIcon } from '../components/icons/BriefcaseIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';

interface LendingOptionsPageProps {
  onBack: () => void;
}

const loanOptions = [
  { 
    icon: <CashIcon className="w-6 h-6 text-green-600" />, 
    title: 'Personal Loans',
    headline: 'Find the right personal loan for you',
    description: 'Need to consolidate debt or make a large purchase? We bring the lenders to you so you can shop and compare personal loan offers in minutes.',
    buttonText: 'Compare Rates'
  },
  { 
    icon: <HomeIcon className="w-6 h-6 text-green-600" />, 
    title: 'Home Purchase',
    headline: 'Compare top mortgage lenders',
    description: "Get multiple lenders to compete for your business and see how much you could save. We make it simple to compare your options.",
    buttonText: 'Compare Rates'
  },
  { 
    icon: <CarIcon className="w-6 h-6 text-green-600" />, 
    title: 'Auto Loans',
    headline: 'Discover the right auto loan for you',
    description: "Take home the car you love. Compare auto loans to find the right fit for you, whether you're buying new, used, or refinancing.",
    buttonText: 'Compare Rates'
  },
  { 
    icon: <PayIcon className="w-6 h-6 text-green-600" />, 
    title: 'Credit Cards',
    headline: 'Shop and compare credit cards',
    description: 'From earning rewards to transferring a balance, find the right credit card to help you score everyday wins.',
    buttonText: 'Compare Credit Cards'
  },
  { 
    icon: <BriefcaseIcon className="w-6 h-6 text-green-600" />, 
    title: 'Business Loans',
    headline: 'Shop and compare business loans',
    description: 'Our network of lenders will compete for your business, so you can get the funding you need for yours.',
    buttonText: 'Compare Business Loans'
  },
];

const LendingOptionsPage: React.FC<LendingOptionsPageProps> = ({ onBack }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (title: string) => {
    setOpenItem(prev => (prev === title ? null : title));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black">
      <header className="flex-shrink-0 p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Lending Options</h1>
        <div className="w-8"></div> {/* Spacer */}
      </header>
      
      <main className="flex-grow overflow-y-auto no-scrollbar p-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          When banks compete, <span className="text-green-500">you win.</span>
        </h2>
        <div className="space-y-3">
            {loanOptions.map((option) => {
              const isOpen = openItem === option.title;
              return (
                <div key={option.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all duration-300">
                  <button 
                    onClick={() => handleToggle(option.title)}
                    className="flex items-center w-full text-left p-4"
                    aria-expanded={isOpen}
                  >
                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-green-100 dark:bg-gray-700 rounded-full mr-4">
                      {option.icon}
                    </div>
                    <p className="flex-1 font-semibold text-gray-800 dark:text-gray-100">{option.title}</p>
                    <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center border-2 border-gray-200 dark:border-gray-600 rounded-full">
                      <ChevronDownIcon className={`w-4 h-4 text-gray-400 dark:text-gray-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{option.headline}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">{option.description}</p>
                        <button className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-colors">
                          {option.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
};

export default LendingOptionsPage;