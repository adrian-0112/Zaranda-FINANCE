import React from 'react';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface ReceiveOptionProps {
  icon: React.ReactNode;
  iconBgColor?: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const ReceiveOption: React.FC<ReceiveOptionProps> = ({ icon, iconBgColor = 'bg-gray-100 dark:bg-gray-900', title, description, onClick }) => {
  return (
    <button className="flex items-center w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors" onClick={onClick}>
      <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${iconBgColor}`}>
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </button>
  );
};

export default ReceiveOption;