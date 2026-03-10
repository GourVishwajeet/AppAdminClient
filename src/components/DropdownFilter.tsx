import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import arrowDownIcon from '../assets/arrow-down.svg';

interface DropdownFilterProps {
  label: string;
  options: string[];
  activeValue: string;
  onSelect: (value: string) => void;
  width?: string;
  searchable?: boolean;
}

export const DropdownFilter: FC<DropdownFilterProps> = ({ 
  label, 
  options, 
  activeValue, 
  onSelect,
  width = 'w-[160px]',
  searchable = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredOptions = searchable 
    ? options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <div 
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${activeValue !== 'All' ? "text-[#0085FF]" : ""} select-none`}>
          {activeValue === 'All' ? label : activeValue}
        </span>
        <img
          src={arrowDownIcon}
          alt="Sort"
          className={`w-4 h-4 ml-2 mr-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className={`fixed mt-2 bg-black border border-[#333] rounded-xl shadow-2xl z-50 overflow-hidden ${width}`}>
          {searchable && (
            <div className="p-2 border-b border-[#333]">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1B1B1B] text-white text-xs px-2 py-1.5 rounded-[6px] border-none focus:ring-1 focus:ring-[#8000FF] outline-none placeholder-gray-500"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className="flex flex-col p-2 gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
            {/* Always show 'All' option if not searching or if it matches */}
            {!searchable || 'All'.toLowerCase().includes(searchTerm.toLowerCase()) ? (
               <div 
                className={`px-4 py-2 text-sm cursor-pointer rounded-[8px] transition-colors ${
                  activeValue === 'All' 
                    ? 'font-medium bg-[#1B1B1B]' 
                    : 'text-[#FFFFFF] font-medium hover:bg-white/5'
                }`}
                onClick={() => handleOptionClick('All')}
              >
                <span className={activeValue === 'All' ? "bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] bg-clip-text text-transparent" : ""}>
                  All
                </span>
              </div>
            ) : null}

            {filteredOptions.map((option) => {
              if (option === 'All') return null; // Handled above
              return (
                <div 
                  key={option}
                  className={`px-4 py-2 text-sm cursor-pointer rounded-[8px] transition-colors ${
                    activeValue === option 
                      ? 'font-medium bg-[#1B1B1B]' 
                      : 'text-[#FFFFFF] font-medium hover:bg-white/5'
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  <span className={activeValue === option ? "bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] bg-clip-text text-transparent" : ""}>
                    {option}
                  </span>
                </div>
              );
            })}
            
            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 text-xs text-gray-500 text-center">
                No results
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
