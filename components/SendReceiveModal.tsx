
import React from 'react';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { PlusIcon } from './icons/PlusIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface SendReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReceiveClick: () => void;
  onSendClick: () => void;
}

const ModalOption: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick?: () => void; }> = ({ icon, title, description, onClick }) => (
    <button className="flex items-center w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors" onClick={onClick}>
        <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg mr-4">
            {icon}
        </div>
        <div className="flex-grow">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </button>
);

const SendReceiveModal: React.FC<SendReceiveModalProps> = ({ isOpen, onClose, onReceiveClick, onSendClick }) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="send-receive-modal-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-t-2xl p-4 pt-2 shadow-2xl">
        <div className="flex justify-center py-2" onClick={onClose}>
            <div className="w-10 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer" aria-label="Close modal"></div>
        </div>
        
        <div className="space-y-2 mt-2">
             <h2 id="send-receive-modal-title" className="sr-only">Send or Receive Options</h2>
            <ModalOption 
                icon={<ArrowUpIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
                title="Send"
                description="Send USDT or MXNB to a recipient."
                onClick={onSendClick}
            />
            <ModalOption 
                icon={<PlusIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
                title="Receive"
                description="Receive USDT into your account."
                onClick={onReceiveClick}
            />
        </div>
      </div>
    </div>
  );
};

export default SendReceiveModal;