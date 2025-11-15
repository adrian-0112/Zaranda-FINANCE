
import React, { useState, useEffect, useRef } from 'react';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';

interface HeaderBarProps {
  onAccountClick: () => void;
  onHelpClick: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onAccountClick, onHelpClick }) => {
  const [isAccountExpanded, setIsAccountExpanded] = useState(false);
  const [isHelpExpanded, setIsHelpExpanded] = useState(false);
  const accountButtonRef = useRef<HTMLButtonElement>(null);
  const helpButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (accountButtonRef.current && !accountButtonRef.current.contains(target)) {
        setIsAccountExpanded(false);
      }
      if (helpButtonRef.current && !helpButtonRef.current.contains(target)) {
        setIsHelpExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-collapse timers
  useEffect(() => {
    let timeoutId: number | undefined;
    if (isAccountExpanded) {
      timeoutId = window.setTimeout(() => setIsAccountExpanded(false), 6000);
    }
    return () => clearTimeout(timeoutId);
  }, [isAccountExpanded]);

  useEffect(() => {
    let timeoutId: number | undefined;
    if (isHelpExpanded) {
      timeoutId = window.setTimeout(() => setIsHelpExpanded(false), 6000);
    }
    return () => clearTimeout(timeoutId);
  }, [isHelpExpanded]);

  const handleAccountButtonClick = () => {
    if (isAccountExpanded) {
      onAccountClick();
      setIsAccountExpanded(false);
    } else {
      setIsAccountExpanded(true);
      setIsHelpExpanded(false); // Collapse other button
    }
  };

  const handleHelpButtonClick = () => {
    if (isHelpExpanded) {
      onHelpClick();
      setIsHelpExpanded(false);
    } else {
      setIsHelpExpanded(true);
      setIsAccountExpanded(false); // Collapse other button
    }
  };

  return (
    <header className="flex justify-between items-center p-4 pt-6 text-white">
      <div className="relative">
        <button
          ref={accountButtonRef}
          onClick={handleAccountButtonClick}
          className={`flex items-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-500 ease-in-out ${
            isAccountExpanded ? 'w-40 pl-2 pr-4 py-2' : 'w-10 h-10 justify-center'
          }`}
          aria-expanded={isAccountExpanded}
          aria-label="My Account"
        >
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AV
          </div>
          <span
            className={`font-semibold whitespace-nowrap overflow-hidden transition-all duration-500 ${
              isAccountExpanded ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0'
            }`}
            aria-hidden={!isAccountExpanded}
          >
            My Account
          </span>
        </button>
      </div>

      <div className="relative">
        <button
          ref={helpButtonRef}
          onClick={handleHelpButtonClick}
          className={`flex items-center flex-row-reverse rounded-full bg-white/20 hover:bg-white/30 transition-all duration-500 ease-in-out ${
            isHelpExpanded ? 'w-40 pl-4 pr-2 py-2' : 'w-10 h-10 justify-center'
          }`}
          aria-expanded={isHelpExpanded}
          aria-label="Support Chat"
        >
          <QuestionMarkCircleIcon className="w-6 h-6 flex-shrink-0" />
          <span
            className={`font-semibold whitespace-nowrap overflow-hidden transition-all duration-500 ${
              isHelpExpanded ? 'opacity-100 w-auto mr-2' : 'opacity-0 w-0'
            }`}
            aria-hidden={!isHelpExpanded}
          >
            Support Chat
          </span>
        </button>
      </div>
    </header>
  );
};

export default HeaderBar;