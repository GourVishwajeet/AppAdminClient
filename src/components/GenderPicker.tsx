import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import arrowDownIcon from '../assets/arrow-down.svg';

interface GenderPickerProps {
  label: string;
  onSelect?: (gender: string) => void;
}

export const GenderPicker: FC<GenderPickerProps> = ({ label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedGender, setSelectedGender] = useState('All');

  const options = ['All', 'Male', 'Female', 'Other'];

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
    setSelectedGender(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedGender !== 'All' ? "text-[#0085FF]" : ""}>
          {selectedGender === 'All' ? label : selectedGender}
        </span>
        <img
          src={arrowDownIcon}
          alt="Sort"
          className="w-4 h-4 ml-2 mr-2"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="fixed mt-2 bg-black border border-[#333] rounded-xl shadow-2xl z-50 overflow-hidden w-[160px]">
          <div className="flex flex-col p-2 gap-1">
            {options.map((option) => (
              <div 
                key={option}
                className={`px-4 py-2 text-sm cursor-pointer rounded-[8px] transition-colors ${
                  selectedGender === option 
                    ? 'font-medium bg-[#1B1B1B]' 
                    : 'text-[#FFFFFF] font-medium hover:bg-white/5'
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <span className={selectedGender === option ? "bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] bg-clip-text text-transparent" : ""}>
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
