import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import arrowDownIcon from '../assets/arrow-down.svg';

interface DateRangePickerProps {
  label: string;
}

export const DateRangePicker: FC<DateRangePickerProps> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock state for calendar
  // In a real app, use date-fns or similar
  const [currentMonth] = useState(new Date(2022, 0, 1)); // Jan 2022
  const [nextMonth] = useState(new Date(2022, 1, 1)); // Feb 2022
  
  const [selectedRange] = useState<{ start: Date | null; end: Date | null }>({
    start: new Date(2022, 0, 6),
    end: new Date(2022, 0, 13)
  });

  const presets = [
    'Today', 'Yesterday', 'This week', 'Last week', 'This month', 'Last month', 'This year', 'Last year', 'All time'
  ];
  const [activePreset, setActivePreset] = useState('Last week');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1; // Mon=0, Sun=6
  };

  const renderCalendar = (date: Date) => {
    const totalDays = daysInMonth(date);
    const startDay = startDayOfMonth(date);
    const days = [];
    
    // Empty cells for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Days
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      const isSelected = selectedRange.start && selectedRange.end && 
        currentDate >= selectedRange.start && currentDate <= selectedRange.end;
      const isStart = selectedRange.start && currentDate.getTime() === selectedRange.start.getTime();
      const isEnd = selectedRange.end && currentDate.getTime() === selectedRange.end.getTime();
      const isFirstCol = (startDay + i - 1) % 7 === 0;
      const isLastCol = (startDay + i - 1) % 7 === 6;

      // Mock data for dots and highlights based on image
      const hasPinkDot = (date.getMonth() === 0 && [6, 13, 22, 24, 26].includes(i)) || 
                         (date.getMonth() === 1 && [4, 10, 22].includes(i));

      const isVisualStart = isSelected && (isStart || isFirstCol || i === 1);
      const isVisualEnd = isSelected && (isEnd || isLastCol || i === totalDays);

      days.push(
        <div 
          key={i} 
          className="w-full h-8 flex items-center justify-center text-xs cursor-pointer relative"
        >
          {/* Grey Background Pill */}
          {isSelected && (
            <div className={`absolute top-0 bottom-0 bg-[#333333] 
              ${isVisualStart ? 'left-0 rounded-l-[20px]' : 'left-[-1px]'} 
              ${isVisualEnd ? 'right-0 rounded-r-[20px]' : 'right-[-1px]'}
            `}></div>
          )}

          {/* Pink Selection Circle */}
          {(isStart) && (
            <div className="absolute w-8 h-8 bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] rounded-full z-10 mr-4"></div>
          )}

          {(isEnd) && (
            <div className="absolute w-8 h-8 bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] rounded-full z-10 ml-3"></div>
          )}

          {/* Hover Effect */}
          {!isSelected && (
            <div className="absolute w-8 h-8 rounded-full hover:bg-white/10 transition-colors"></div>
          )}

          {/* Content */}
          <div className={`relative z-20 flex flex-col items-center text-white ${isStart ? 'mr-4' : ''} ${isEnd ? 'ml-3' : ''}`}>
            <span className={`relative ${(hasPinkDot && !isStart && !isEnd) ? 'top-[1px] mt-1' : ''} ${(isStart || isEnd) ? '-top-[1px]' : ''}`}>{i}</span>
            {hasPinkDot && !isStart && !isEnd && (
              <div className="w-1 h-1 rounded-full mt-0.5 bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)]"></div>
            )}  
          </div>
        </div>
      );
    }
    return days;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="relative" ref={dropdownRef} >
      {/* Trigger */}
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <img
          src={arrowDownIcon}
          alt="Sort"
          className="w-4 h-4 ml-2 mr-2"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="fixed mt-2 bg-black border border-[#333] rounded-xl shadow-2xl z-50 flex overflow-hidden" style={{ width: '851px', transform: 'translateX(-30%)' }}>
          {/* Sidebar */}
          <div className="w-[192px] h-[464px] border-r border-[#333] p-2 bg-black gap-1 flex flex-col">
            {presets.map(preset => (
              <div 
                key={preset}
                className={`px-4 py-2 text-xs cursor-pointer rounded-[6px] mb-1 ${
                  activePreset === preset 
                    ? 'text-[14px] font-medium bg-[#1B1B1B] rounded-[6px]' 
                    : 'text-[#FFFFFF] text-[14px] font-medium hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setActivePreset(preset)}
              >
                <span className={activePreset === preset ? "bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] bg-clip-text text-transparent" : ""}>
                  {preset}
                </span>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-black">
            <div className="flex flex-1">
              {/* Calendar 1 */}
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-4 px-2">
                  <button className="text-gray-400 hover:text-white">&lt;</button>
                  <span className="text-white text-sm font-medium">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                  <button className="text-gray-400 hover:text-white">&gt;</button>
                </div>
                <div className="grid grid-cols-7 mb-2">
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'].map(d => (
                    <div key={d} className="text-center text-xs text-gray-500">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-2">
                  {renderCalendar(currentMonth)}
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] bg-[#333]"></div>

              {/* Calendar 2 */}
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-4 px-2">
                  <button className="text-gray-400 hover:text-white">&lt;</button>
                  <span className="text-white text-sm font-medium">{monthNames[nextMonth.getMonth()]} {nextMonth.getFullYear()}</span>
                  <button className="text-gray-400 hover:text-white">&gt;</button>
                </div>
                <div className="grid grid-cols-7 mb-2">
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'].map(d => (
                    <div key={d} className="text-center text-xs text-gray-500">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-2">
                  {renderCalendar(nextMonth)}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-[#333] gap-4">
              <div className="flex items-center gap-8">
                <div className="w-[136px] h-[40px] border border-[#333] rounded-[8px] px-3 py-1.5 text-xs text-white flex justify-center items-center">
                  Jan 6, 2022
                </div>
                <span className="text-gray-500">-</span>
                <div className="w-[136px] h-[40px] border border-[#333] rounded-[8px] px-3 py-1.5 text-xs text-white flex justify-center items-center">
                  Jan 13, 2022
                </div>
              </div>
              <div className="flex items-center gap-8"> 
                <button 
                  className="px-4 py-1.5 text-xs text-white border border-[#333] rounded-[12px] w-[144px] h-[40px]"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-1.5 text-xs text-white bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] border border-transparent hover:opacity-90 rounded-[12px] transition-all w-[144px] h-[40px]"
                  onClick={() => setIsOpen(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
