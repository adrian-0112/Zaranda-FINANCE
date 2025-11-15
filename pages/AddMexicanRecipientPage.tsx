
import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

interface AddMexicanRecipientPageProps {
  onBack: () => void;
}

const AddMexicanRecipientPage: React.FC<AddMexicanRecipientPageProps> = ({ onBack }) => {
  const [recipientType, setRecipientType] = useState<'individual' | 'business'>('individual');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    clabe: '',
    nickname: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'clabe' && (!/^\d*$/.test(value) || value.length > 18)) {
      return; // Only allow digits and max 18 chars for CLABE
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = useMemo(() => {
    const clabeValid = formData.clabe.trim().length === 18;
    if (recipientType === 'individual') {
      return formData.firstName.trim() !== '' && formData.lastName.trim() !== '' && clabeValid;
    }
    // Business
    return formData.businessName.trim() !== '' && clabeValid;
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

  const FormInput: React.FC<{ name: string; placeholder: string; value: string; }> = ({ name, placeholder, value }) => (
     <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className="w-full bg-white text-gray-900 placeholder-gray-400 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
        autoComplete="off"
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
        <h1 className="text-xl font-bold ml-4">Add Mexican recipient</h1>
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
          <FormInput name="clabe" placeholder="CLABE" value={formData.clabe} />
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

export default AddMexicanRecipientPage;
