import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

type CalendarView = 'day' | 'month' | 'year';

const DatePicker: React.FC<DatePickerProps> = ({ isOpen, onClose, onSelectDate, minDate, maxDate }) => {
  const [view, setView] = useState<CalendarView>('day');
  const [currentDate, setCurrentDate] = useState(new Date());
  // This state is for the year view to track the page of years
  const [yearPage, setYearPage] = useState(new Date().getFullYear());

  if (!isOpen) return null;

  // Header Navigation Logic
  const handlePrev = () => {
    if (view === 'day') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
    } else { // year view
      setYearPage(yearPage - 12);
    }
  };

  const handleNext = () => {
    if (view === 'day') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
    } else { // year view
      setYearPage(yearPage + 12);
    }
  };
  
  // Render Day View
  const renderDayView = () => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    const minDateNorm = minDate ? new Date(new Date(minDate).setHours(0,0,0,0)) : null;
    const maxDateNorm = maxDate ? new Date(new Date(maxDate).setHours(0,0,0,0)) : null;

    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(<div key={`empty-start-${i}`} className="p-2"></div>);
    }
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isDisabled = (minDateNorm && date < minDateNorm) || (maxDateNorm && date > maxDateNorm);
      const isToday = new Date().toDateString() === date.toDateString();

      calendarDays.push(
        <button
          key={`day-${i}`}
          onClick={() => !isDisabled && onSelectDate(date)}
          disabled={isDisabled}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              isDisabled ? 'text-gray-300 dark:text-gray-500 cursor-not-allowed' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          } ${isToday ? 'bg-green-500 text-white hover:bg-green-600' : ''}`}
        >
          {i}
        </button>
      );
    }
    
    return (
      <>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">
          {daysOfWeek.map(day => <div key={day} className="py-2">{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 justify-items-center">
          {calendarDays}
        </div>
      </>
    );
  };
  
  // Render Month View
  const renderMonthView = () => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return (
      <div className="grid grid-cols-4 gap-2 py-2">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => {
              setCurrentDate(new Date(currentDate.getFullYear(), index, 1));
              setView('day');
            }}
            className="p-3 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {month}
          </button>
        ))}
      </div>
    );
  };

  // Render Year View
  const renderYearView = () => {
    const years = [];
    const startYear = yearPage - 5;
    for (let i = 0; i < 12; i++) {
      years.push(startYear + i);
    }
    
    return (
      <div className="grid grid-cols-4 gap-2 py-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => {
              setCurrentDate(new Date(year, currentDate.getMonth(), 1));
              setView('day');
            }}
            className={`p-3 rounded-lg text-sm font-semibold transition-colors ${
                year === new Date().getFullYear() ? 'bg-green-100 text-green-700' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 w-80" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrev} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200" aria-label="Previous">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          
          <div className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center space-x-2">
              {view === 'day' && (
                  <>
                      <button onClick={() => setView('month')} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-colors">
                          {currentDate.toLocaleString('default', { month: 'long' })}
                      </button>
                      <button onClick={() => { setYearPage(currentDate.getFullYear()); setView('year'); }} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-colors">
                          {currentDate.getFullYear()}
                      </button>
                  </>
              )}
              {view === 'month' && (
                  <button onClick={() => { setYearPage(currentDate.getFullYear()); setView('year'); }} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-colors">
                      {currentDate.getFullYear()}
                  </button>
              )}
              {view === 'year' && (
                 <span>
                    {`${yearPage - 5} - ${yearPage + 6}`}
                 </span>
              )}
          </div>

          <button onClick={handleNext} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200" aria-label="Next">
             <ArrowLeftIcon className="w-5 h-5 transform rotate-180" />
          </button>
        </div>
        {view === 'day' && renderDayView()}
        {view === 'month' && renderMonthView()}
        {view === 'year' && renderYearView()}
      </div>
    </div>
  );
};

export default DatePicker;