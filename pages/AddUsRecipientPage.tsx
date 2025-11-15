
import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

interface AddUsRecipientPageProps {
  onBack: () => void;
}

const AddUsRecipientPage: React.FC<AddUsRecipientPageProps> = ({ onBack }) => {
  const [recipientType, setRecipientType] = useState<'individual' | 'business'>('individual');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    routingNumber: '',
    accountNumber: '',
    nickname: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if ((name === 'routingNumber' || name === 'accountNumber') && !/^\d*$/.test(value)) {
      return; // Only allow digits
    }
     if (name === 'routingNumber' && value.length > 9) {
      return; // Max 9 digits for routing
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = useMemo(() => {
    const routingValid = formData.routingNumber.trim().length === 9;
    const accountValid = formData.accountNumber.trim().length > 0;

    if (recipientType === 'individual') {
      return formData.firstName.trim() !== '' && formData.lastName.trim() !== '' && routingValid && accountValid;
    }
    // Business
    return formData.businessName.trim() !== '' && routingValid && accountValid;
  }, [formData, recipientType]);

  const TabButton: React.FC<{
    label: string;
    type: 'individual' | 'business';
  }> = ({ label, type }) => (
    <button
      onClick={() => setRecipientType(type)}
      className={`w-full py-3 text-sm font-semibold rounded-lg transition-colors ${
        recipientType === type ? 'bg-white shadow' : 'text-gray-500'
      }`}
    >
      {label}
    </button>
  );

  const FormInput: React.FC<{ name: keyof typeof formData; placeholder: string; value: string; }> = ({ name, placeholder, value }) => (
     <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className="w-full bg-white text-gray-900 placeholder-gray-400 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
        autoComplete="off"
        inputMode={name === 'routingNumber' || name === 'accountNumber' ? 'numeric' : 'text'}
      />
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
        <h1 className="text-xl font-bold ml-4">Add US recipient</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Tab Selector */}
        <div className="bg-gray-200 p-1 rounded-xl flex space-x-1">
            <TabButton label="Individual" type="individual" />
            <TabButton label="Business" type="business" />
        </div>

        {/* Form Section */}
        <div className="space-y-4">
          {recipientType === 'individual' ? (
            <>
              <FormInput name="firstName" placeholder="Recipient first name" value={formData.firstName} />
              <FormInput name="lastName" placeholder="Recipient last name" value={formData.lastName} />
            </>
          ) : (
            <FormInput name="businessName" placeholder="Business name" value={formData.businessName} />
          )}
          <FormInput name="routingNumber" placeholder="ACH Routing Number" value={formData.routingNumber} />
          <FormInput name="accountNumber" placeholder="ACH Account number" value={formData.accountNumber} />
          <FormInput name="nickname" placeholder="Nickname (optional)" value={formData.nickname} />
        </div>
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

export default AddUsRecipientPage;
