import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

const IconWithOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative flex items-center justify-center w-full h-full">
            {children}
            <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-100 dark:border-gray-900">
                <DownloadIcon className="w-3 h-3 text-white" />
            </div>
        </div>
    );
};

export default IconWithOverlay;