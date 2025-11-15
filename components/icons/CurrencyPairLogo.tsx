import React from 'react';
import { UsdtIcon } from './UsdtIcon';
import { MxnbIcon } from './MxnbIcon';

const CurrencyPairLogo: React.FC = () => {
    return (
        <div className="flex items-center">
            <div className="w-8 h-8 rounded-full z-10 border-2 border-white">
                <UsdtIcon />
            </div>
            <div className="w-8 h-8 rounded-full -ml-3 border-2 border-white">
                <MxnbIcon />
            </div>
        </div>
    );
};

export default CurrencyPairLogo;