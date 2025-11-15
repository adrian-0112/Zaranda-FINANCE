import React from 'react';

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void; }> = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex items-center h-7 w-12 flex-shrink-0 rounded-full cursor-pointer transition-colors ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-black ${enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
    role="switch"
    aria-checked={enabled}
  >
    <span className="sr-only">Toggle</span>
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-block w-5 h-5 rounded-full bg-white shadow-lg ring-0 transform transition-transform ease-in-out duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

export default ToggleSwitch;
