
import React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { SendIcon } from './icons/SendIcon';

const PromoGraphic: React.FC = () => (
    <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full"></div>
        <div className="absolute w-24 h-24 flex items-center justify-center animate-pulse">
            <div className="absolute w-12 h-12 bg-green-200 dark:bg-green-800/50 rounded-full opacity-50"></div>
            <div className="absolute w-20 h-20 bg-green-200 dark:bg-green-800/50 rounded-full opacity-30"></div>
        </div>
        <SendIcon className="relative w-10 h-10 text-green-500 -rotate-45" />
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm shadow-md">$</div>
    </div>
);


const PromoCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 flex justify-between items-center shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="flex-1 pr-4">
        <h3 className="font-bold text-gray-800 dark:text-gray-100">Invite & Earn $5</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 my-1">
          Share with a friend and you'll both get a reward.
        </p>
        <a href="#" className="text-green-500 font-semibold text-sm flex items-center space-x-1 hover:underline">
          <span>Share now</span>
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
      <div className="flex-shrink-0">
          <PromoGraphic/>
      </div>
    </div>
  );
};

export default PromoCard;