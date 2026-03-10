import type { FC } from 'react';
import { useState } from 'react';
import searchIcon from '../assets/search.svg';
import filtersIcon from '../assets/filters.svg';
import { FilterModal } from './FilterModal';

interface TopBarProps {
  heading: string;
  onSearch?: (value: string) => void;
  searchValue?: string;
}

export const TopBar: FC<TopBarProps> = ({ heading, onSearch, searchValue }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] font-semibold text-[#FFFFFF]">{heading}</h1>
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src={searchIcon} alt="Search" className="w-[20px] h-[20px] object-contain" />
            </div>
            <input
              type="text"
              placeholder="Search category..."
              value={searchValue}
              onChange={(e) => onSearch?.(e.target.value)}
              className="block w-[557px] h-[40px] pl-10 pr-3 py-2 border border-[#2A2A2A] rounded-[10px] text-[14px] font-regular text-[#BCBCBC] placeholder-[#BCBCBC] focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:border-transparent"
            />
          </div>
          
          {/* Filter Button */}
          <div className="relative cursor-pointer">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`w-[98px] h-[40px] flex items-center justify-center gap-2 px-4 py-2 border border-[#2A2A2A] rounded-[10px] text-[14px] font-medium transition-colors cursor-pointer ${
                isFilterOpen 
                  ? 'bg-[#2A2A2A] text-[#FFFFFF]' 
                  : 'text-[#BCBCBC] hover:bg-[#2A2A2A] hover:text-[#FFFFFF]'
              }`}
            >
              <img src={filtersIcon} alt="Filters" className="w-[20px] h-[20px] object-contain" />
              Filters
            </button>
            
            <FilterModal 
              isOpen={isFilterOpen} 
              onClose={() => setIsFilterOpen(false)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
