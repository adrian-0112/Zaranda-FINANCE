import React, { useState } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import ContactListItem from '../components/ContactListItem';
import { contacts } from '../data/contacts';

interface RequestFromFriendPageProps {
  onBack: () => void;
}

const RequestFromFriendPage: React.FC<RequestFromFriendPageProps> = ({ onBack }) => {
  const [contactsSynced, setContactsSynced] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      <header className="flex-shrink-0 p-4 pt-6 bg-gray-50 dark:bg-black">
        <div className="flex items-center">
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={contactsSynced ? "Name, @ZarandaTag, Phone" : "@ZarandaTag"}
            className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg py-3 pl-11 pr-4 text-sm focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>
      </header>

      <main className={`flex-1 ${contactsSynced ? 'overflow-y-auto no-scrollbar' : 'flex items-center justify-center'}`}>
        {contactsSynced ? (
          <div className="px-4 pb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 my-4">
              Request digital dollars from anyone, even if they're not on Zaranda.
              <a href="#" className="text-green-500 font-semibold"> Learn how it works.</a>
            </p>
            <h2 className="font-bold text-lg mb-2">Contacts</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {contacts.map((contact, index) => (
                  <ContactListItem key={index} contact={contact} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center px-8">
            <h1 className="text-2xl font-bold mb-4">
              Request funds from anyone, instantly and for free.
            </h1>
            <button onClick={() => setContactsSynced(true)} className="text-green-500 font-semibold hover:underline">
              Sync contacts to start
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default RequestFromFriendPage;
