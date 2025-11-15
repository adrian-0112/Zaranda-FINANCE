
import React from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { VerifiedIcon } from '../components/icons/VerifiedIcon';
import { BrokenHeartIcon } from '../components/icons/BrokenHeartIcon';

interface PersonalDetailsPageProps {
  onBack: () => void;
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="px-4 pt-6 pb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">{title}</h2>
);

interface InfoRowProps {
  label: string;
  value: string;
  subValue?: React.ReactNode;
  clickable?: boolean;
  isDestructive?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, subValue, clickable = false, isDestructive = false, icon, onClick }) => {
  const content = (
    <div className="flex items-center w-full text-left py-3 px-4">
      {icon && <div className={`mr-3 ${isDestructive ? 'text-red-500' : 'text-gray-500'}`}>{icon}</div>}
      <div className="flex-1">
        <p className={`text-xs ${isDestructive ? 'text-red-500 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>{label}</p>
        {!isDestructive && <p className="text-gray-800 dark:text-gray-100 font-medium">{value}</p>}
        {subValue && <div className="mt-1">{subValue}</div>}
      </div>
      {clickable && <ChevronRightIcon className="w-5 h-5 text-gray-400" />}
    </div>
  );

  if (clickable) {
    return (
      <button onClick={onClick} className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/60 transition-colors">
        {content}
      </button>
    );
  }
  
  if (isDestructive) {
      return (
          <button onClick={onClick} className="w-full">
            {content}
          </button>
      )
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg">
      {content}
    </div>
  );
};

const PersonalDetailsPage: React.FC<PersonalDetailsPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-black">
      <header className="flex-shrink-0 p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Personal details</h1>
        <div className="w-8"></div> {/* Spacer */}
      </header>

      <main className="flex-grow overflow-y-auto no-scrollbar pb-8">
        <SectionHeader title="Account" />
        <div className="px-4">
          <InfoRow label="ZarandaTag" value="@adriaaan" clickable />
        </div>

        <SectionHeader title="Personal details" />
        <div className="px-4 space-y-2">
          <InfoRow label="First name" value="Adrián" />
          <InfoRow label="Last name" value="Vargas" />
          <InfoRow label="Date of birth" value="December 01, 2004" />
          <InfoRow label="Phone number" value="525512347431" />
          <InfoRow label="Legal ID" value="BEVA041201HDFNRDA4" />
          <InfoRow 
            label="Email" 
            value="adrian.compras0112@gmail.com"
            subValue={
              <div className="flex items-center text-xs text-green-600 font-medium">
                <VerifiedIcon className="w-4 h-4 mr-1 text-green-500" />
                Verified
              </div>
            } 
            clickable 
          />
          <InfoRow label="Sex" value="Male" clickable />
        </div>
        
        <SectionHeader title="Residence address" />
        <div className="px-4">
            <InfoRow label="Full address" value="Avenida Centenario 2702, Bosques de..." clickable />
        </div>

        <div className="mt-12 px-4">
            <InfoRow 
                icon={<BrokenHeartIcon className="w-6 h-6" />}
                label="Close account"
                value=""
                isDestructive
                clickable
            />
        </div>
      </main>
    </div>
  );
};

export default PersonalDetailsPage;