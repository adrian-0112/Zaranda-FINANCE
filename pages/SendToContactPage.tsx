
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import ContactListItem from '../components/ContactListItem';
import { contacts } from '../data/contacts';
import { View, AnimationDirection } from '../App';
import BottomNavBar from '../components/BottomNavBar';
import SendReceiveModal from '../components/SendReceiveModal';

interface SendToContactPageProps {
  onNavigate: (view: View, direction?: AnimationDirection) => void;
  activeView: View;
}

const SendToContactPage: React.FC<SendToContactPageProps> = ({ onNavigate, activeView }) => {
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
      <div className="flex flex-col h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <main className="flex-1 overflow-y-auto no-scrollbar pt-6 pb-24">
          <div className="px-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-green-500 focus:border-green-500 transition"
                aria-label="Search contacts"
              />
            </div>
          </div>

          <div className="px-2 pt-4 pb-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl">
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {contacts.map((contact, index) => (
                    <ContactListItem key={index} contact={contact} />
                  ))}
                </div>
              </div>
          </div>
        </main>
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

export default SendToContactPage;
