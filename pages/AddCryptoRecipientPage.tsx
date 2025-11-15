
import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { PasteIcon } from '../components/icons/PasteIcon';
import { QrCodeScanIcon } from '../components/icons/QrCodeScanIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';

interface AddCryptoRecipientPageProps {
  onBack: () => void;
}

const AddCryptoRecipientPage: React.FC<AddCryptoRecipientPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    walletAddress: '',
    network: '',
    nickname: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // A mock function to simulate pasting from clipboard
  const handlePaste = async () => {
      try {
          const text = await navigator.clipboard.readText();
          setFormData(prev => ({ ...prev, walletAddress: text }));
      } catch (err) {
          console.error('Failed to read clipboard contents: ', err);
      }
  };

  const isFormValid = useMemo(() => {
    return formData.walletAddress.trim() !== '' && formData.network.trim() !== '';
  }, [formData]);
  
  const FormInput: React.FC<{ name: keyof typeof formData; placeholder: string; value: string; children?: React.ReactNode; }> = ({ name, placeholder, value, children }) => (
     <div className="relative">
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            className="w-full bg-white text-gray-900 placeholder-gray-400 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow pr-20"
            autoComplete="off"
        />
        {children}
     </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-900">
      <header className="flex-shrink-0 p-4 pt-6 flex items-center bg-gray-50">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-4">Add crypto recipient</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <FormInput name="walletAddress" placeholder="Wallet Address" value={formData.walletAddress}>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <button onClick={handlePaste} className="p-1.5 text-gray-500 hover:text-green-500 hover:bg-gray-100 rounded-md transition-colors" aria-label="Paste address">
                    <PasteIcon className="w-5 h-5" />
                </button>
                 <button className="p-1.5 text-gray-500 hover:text-green-500 hover:bg-gray-100 rounded-md transition-colors" aria-label="Scan QR code">
                    <QrCodeScanIcon className="w-5 h-5" />
                </button>
            </div>
        </FormInput>
        
        <div className="relative">
            <button 
                onClick={() => setFormData(prev => ({...prev, network: 'Ethereum'}))}
                className="w-full bg-white text-gray-900 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow text-left flex justify-between items-center"
            >
                {formData.network ? 
                    <span className="text-gray-900">{formData.network}</span> : 
                    <span className="text-gray-400">Select Network</span>
                }
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            </button>
        </div>

        <input
            type="text"
            name="nickname"
            placeholder="Nickname (optional)"
            value={formData.nickname}
            onChange={handleInputChange}
            className="w-full bg-white text-gray-900 placeholder-gray-400 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
            autoComplete="off"
        />

        <p className="text-xs text-gray-500 px-2 pt-2">
            Warning: Only send USDT on the selected network. Sending to the wrong network or address will result in a loss of funds.
        </p>

      </main>

      <footer className="p-4 bg-gray-50">
        <button
          disabled={!isFormValid}
          className="w-full font-semibold py-4 text-lg rounded-xl transition-colors text-white
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     bg-gray-800 hover:bg-gray-900"
        >
          Continue
        </button>
      </footer>
    </div>
  );
};

export default AddCryptoRecipientPage;
