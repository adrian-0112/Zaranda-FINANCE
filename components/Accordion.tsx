
import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronUpIcon } from './icons/ChevronUpIcon';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-800 dark:text-gray-100">{title}</span>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        )}
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
            <div className="p-4 pt-0 text-sm">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
