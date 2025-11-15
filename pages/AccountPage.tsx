
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { View } from '../App';

import { CloseIcon } from '../components/icons/CloseIcon';
import { VerifiedIcon } from '../components/icons/VerifiedIcon';
import { QuestionMarkCircleIcon } from '../components/icons/QuestionMarkCircleIcon';
import { PersonalDetailsIcon } from '../components/icons/PersonalDetailsIcon';
import { TransactionLimitsIcon } from '../components/icons/TransactionLimitsIcon';
import { AccountFeesIcon } from '../components/icons/AccountFeesIcon';
import { AccountStatementsIcon } from '../components/icons/AccountStatementsIcon';
import { MembershipIcon } from '../components/icons/MembershipIcon';
import { PromoCodeIcon } from '../components/icons/PromoCodeIcon';
import { NotificationIcon } from '../components/icons/NotificationIcon';
import { SecurityIcon } from '../components/icons/SecurityIcon';
import { AppearanceIcon } from '../components/icons/AppearanceIcon';
import { SignOutIcon } from '../components/icons/SignOutIcon';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { TwitterIcon } from '../components/icons/TwitterIcon';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import ToggleSwitch from '../components/ToggleSwitch';


interface AccountPageProps {
    onBack: () => void;
    onNavigate: (view: View) => void;
}

interface ListItemProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ListItem: React.FC<ListItemProps> = ({ icon, title, subtitle, action, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        <div className="text-gray-500 dark:text-gray-400 mr-4">{icon}</div>
        <div className="flex-1">
            <p className="font-semibold text-gray-800 dark:text-gray-100">{title}</p>
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
    </button>
);


const AccountPage: React.FC<AccountPageProps> = ({ onBack, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="bg-gray-50 dark:bg-black h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between p-4 flex-shrink-0">
            <div className="w-10"></div> {/* Spacer */}
            <h1 id="account-page-title" className="text-lg font-semibold text-gray-800 dark:text-gray-200">My Account</h1>
            <button onClick={onBack} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full" aria-label="Close">
                <CloseIcon className="w-6 h-6" />
            </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
            <div className="p-4 space-y-6">

                {/* Profile Section */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3">
                        AV
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Adrián Vargas</h2>
                    <div className="flex items-center space-x-1 text-green-500 font-semibold">
                        <span>$adriaaan</span>
                        <VerifiedIcon className="w-5 h-5" />
                    </div>
                </div>

                {/* Premium Card */}
                <div className="bg-gray-800 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-bold text-lg">Zaranda Premium</h3>
                        <p className="text-sm text-gray-300 my-2">Unlock exclusive rewards: lower fees, cashback, and more.</p>
                        <a href="#" className="font-semibold text-sm flex items-center space-x-1 hover:underline text-green-400">
                            <span>Upgrade to Premium</span>
                            <ArrowRightIcon className="w-4 h-4 -rotate-45" />
                        </a>
                    </div>
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                         className="absolute top-0 right-0 h-full w-2/5 object-cover opacity-30 z-0" alt="Premium background"/>
                </div>

                {/* Help Center */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                   <ListItem icon={<QuestionMarkCircleIcon className="w-6 h-6" />} title="Help Center" />
                </div>

                {/* Account Details */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                    <ListItem icon={<PersonalDetailsIcon className="w-6 h-6" />} title="Personal details" onClick={() => onNavigate('personalDetails')} />
                    <ListItem icon={<TransactionLimitsIcon className="w-6 h-6" />} title="Transaction limits" onClick={() => onNavigate('transactionLimits')} />
                    <ListItem icon={<AccountFeesIcon className="w-6 h-6" />} title="Account fees" onClick={() => onNavigate('accountFees')} />
                    <ListItem icon={<AccountStatementsIcon className="w-6 h-6" />} title="Account statements" onClick={() => onNavigate('accountStatements')} />
                    <ListItem icon={<MembershipIcon className="w-6 h-6" />} title="Membership" subtitle="Standard" />
                </div>

                {/* Promo Code */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <ListItem icon={<PromoCodeIcon className="w-6 h-6" />} title="Enter a promo code" />
                </div>
                
                {/* App Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                    <ListItem
                        icon={<NotificationIcon className="w-6 h-6" />}
                        title="Allow push notifications"
                        onClick={() => setNotificationsEnabled(prev => !prev)}
                        action={
                            <div onClick={(e) => e.stopPropagation()}>
                                <ToggleSwitch enabled={notificationsEnabled} onChange={setNotificationsEnabled} />
                            </div>
                        }
                    />
                    <ListItem icon={<SecurityIcon className="w-6 h-6" />} title="Security" onClick={() => onNavigate('security')} />
                    <ListItem 
                        icon={<AppearanceIcon className="w-6 h-6" />} 
                        title="Appearance" 
                        subtitle={theme === 'light' ? 'Light mode' : 'Dark mode'}
                        onClick={toggleTheme}
                    />
                    <ListItem icon={<SignOutIcon className="w-6 h-6" />} title="Sign out" />
                </div>

                {/* Footer */}
                <footer className="text-center space-y-4 pt-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        <a href="#" className="hover:underline">Terms and Conditions</a> and <a href="#" className="hover:underline">Privacy Policy</a>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"><InstagramIcon className="w-6 h-6" /></a>
                        <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"><TwitterIcon className="w-6 h-6" /></a>
                    </div>
                    <p className="text-sm text-gray-400 dark:text-gray-500">v1.0.0</p>
                </footer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;