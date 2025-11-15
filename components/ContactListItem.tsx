import React from 'react';
import { Contact } from '../data/contacts';

interface ContactListItemProps {
  contact: Contact;
}

const ContactListItem: React.FC<ContactListItemProps> = ({ contact }) => {
  const avatarColor = contact.isRegistered
    ? 'bg-green-200 text-green-800'
    : 'bg-gray-200 text-gray-800';

  return (
    <button className="flex items-center w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 ${avatarColor}`}>
        {contact.initials}
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">{contact.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {contact.isRegistered && contact.tag ? contact.tag : contact.phone}
        </p>
      </div>
    </button>
  );
};

export default ContactListItem;