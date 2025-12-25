import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isWithinInterval, 
  startOfWeek, 
  endOfWeek, 
  subDays,
  startOfYear,
  endOfYear,
  subYears,
  startOfToday
} from 'date-fns';
import arrowDownIcon from '../assets/arrow-down.svg';

interface DateRangePickerProps {
  label: string;
  onApply?: (range: { start: Date | null; end: Date | null }) => void;
}

type DateRange = {
  start: Date | null;
  end: Date | null;
};

export const DateRangePicker: FC<DateRangePickerProps> = ({ label, onApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Default to empty/null for "All" or "Unfiltered" state
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: null,
    end: null
  });

  const today = startOfToday();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateClick = (date: Date) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      // Start new range
      setSelectedRange({ start: date, end: null });
    } else {
      // Complete range
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: selectedRange.start });
      } else {
        setSelectedRange({ ...selectedRange, end: date });
      }
    }
  };

  const renderCalendar = (monthDate: Date) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    return calendarDays.map((date, i) => {
      const isCurrentMonth = isSameMonth(date, monthDate);
      
      if (!isCurrentMonth) {
        return <div key={i} className="w-8 h-8"></div>;
      }

      const isSelected = selectedRange.start && selectedRange.end && 
        isWithinInterval(date, { start: selectedRange.start, end: selectedRange.end });
      
      const isStart = selectedRange.start && isSameDay(date, selectedRange.start);
      const isEnd = selectedRange.end && isSameDay(date, selectedRange.end);
      
      // Visual boundary logic
      const colIndex = i % 7;
      const isFirstCol = colIndex === 0;
      const isLastCol = colIndex === 6;

      const isVisualStart = isSelected && (isStart || isFirstCol);
      const isVisualEnd = isSelected && (isEnd || isLastCol);

      return (
        <div 
          key={i} 
          className="w-full h-10 flex items-center justify-center text-xs cursor-pointer relative"
          onClick={() => handleDateClick(date)}
        >
          {/* Grey Background Pill for Range */}
          {isSelected && (
            <div className={`absolute h-8 top-1/2 -translate-y-1/2 bg-[#333333] 
              ${isStart ? 'left-1/2 -ml-4 rounded-l-[20px]' : (isVisualStart ? 'left-0 rounded-l-[20px]' : 'left-[-32px] rounded-l-[20px]')} 
              ${isEnd ? 'right-1/2 -mr-4 rounded-r-[20px]' : (isVisualEnd ? 'right-0 rounded-r-[20px]' : '-right-px')}
            `}></div>
          )}

          {/* Pink Selection Circle */}
          {(isStart) && (
            <div className="absolute w-8 h-8 bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] rounded-full z-10"></div>
          )}

          {(isEnd) && (
            <div className="absolute w-8 h-8 bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] rounded-full z-10"></div>
          )}

          {/* Hover Effect */}
          {!isSelected && !isStart && !isEnd && (
            <div className="absolute w-8 h-8 rounded-full hover:bg-white/10 transition-colors"></div>
          )}

          {/* Content */}
          <div className={`relative z-20 flex flex-col items-center text-white ${isStart ? '' : ''} ${isEnd ? '' : ''}`}>
            <span className={`relative ${(isStart || isEnd) ? '-top-px' : ''}`}>
              {format(date, 'd')}
            </span>
          </div>
        </div>
      );
    });
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const formatDateDisplay = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="relative" ref={dropdownRef} >
      {/* Trigger */}
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedRange.start && selectedRange.end ? "text-[#0085FF] text-xs whitespace-nowrap" : ""}>
          {selectedRange.start && selectedRange.end 
            ? `${format(selectedRange.start, 'MMM d')} - ${format(selectedRange.end, 'MMM d')}` 
            : label}
        </span>
        <img
          src={arrowDownIcon}
          alt="Sort"
          className="w-4 h-4 ml-2 mr-2"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="fixed mt-2 bg-black border border-[#333] rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden" style={{ width: '320px' }}>
          
          {/* Main Content */}
          <div className="flex flex-col bg-black">
            
            {/* Calendar */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-6 px-2">
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  &lt;
                </button>
                <span className="text-white text-sm font-medium">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  &gt;
                </button>
              </div>
              <div className="grid grid-cols-7 mb-5">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'].map(d => (
                  <div key={d} className="text-center text-xs text-gray-500">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-4">
                {renderCalendar(currentMonth)}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-[#333] gap-2">
              <button 
                className="px-4 py-1.5 text-xs text-white border border-[#333] rounded-[12px] flex-1 h-[40px]"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-1.5 text-xs text-white bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] border border-transparent hover:opacity-90 rounded-[12px] transition-all flex-1 h-[40px]"
                onClick={() => {
                  onApply?.(selectedRange);
                  setIsOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
