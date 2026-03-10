import type { FC } from 'react';
import { useState } from 'react';
// import arrowDownIcon from '../assets/arrow-down.svg';
import upIcon from '../assets/up.svg';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterModal: FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const [minValue, setMinValue] = useState(200);
  const [maxValue, setMaxValue] = useState(8000);
  const [selectedSort, setSelectedSort] = useState<'asc' | 'desc' | null>(null);
  const [operator, setOperator] = useState('(<) Less Than');
  const [isOperatorOpen, setIsOperatorOpen] = useState(true);

  if (!isOpen) return null;

  const operators = [
    '(=) Equals',
    '(<) Less Than',
    '(>) Greater Than',
    '(<=) Less Than Equal',
    '(>=) Greater Than Equal'
  ];

  return (
    <div className="absolute top-full right-0 mt-2 w-[220px] bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 w-[220px] h-[40px]">
        <h3 className="text-[16px] font-semibold text-[#1A1A1A]">Filter</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-50 rounded-full transition-colors">
          <img src={upIcon} alt="Collapse" className="w-[20px] h-[20px] text-[#000000]" />
        </button>
      </div>

      {/* Clear All */}
      <div className="bg-[#E5F6FF] px-4 py-2 flex justify-end items-center w-[220px] h-[28px]">
        <button className="text-[12px] font-medium text-[#0099FF] hover:text-[#0066cc] transition-colors">
          Clear all
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          className="w-full h-[29px] px-4 border-[1.5px] border-[#0099FF] rounded-[6px] text-[14px] font-regular text-[#73737380] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0085FF] focus:ring-1 focus:ring-[#0085FF]"
        />

        {/* Sort Options */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedSort === 'asc'}
              onChange={() => setSelectedSort(selectedSort === 'asc' ? null : 'asc')}
              className="w-[15px] h-[15px] rounded-[4px] border-[#D0D5DD] text-[#0085FF] focus:ring-[#0085FF]"
            />
            <span className="text-[14px] font-medium text-[#484848]">Low to high</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedSort === 'desc'}
              onChange={() => setSelectedSort(selectedSort === 'desc' ? null : 'desc')}
              className="w-[15px] h-[15px] rounded-[4px] border-[#D0D5DD] text-[#0085FF] focus:ring-[#0085FF]"
            />
            <span className="text-[14px] font-medium text-[#484848]">high to Low</span>
          </label>
        </div>

        {/* Range Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[12px] text-[#4B5563]">
            <span className="px-2 py-1 border border-gray-200 rounded">{minValue}</span>
            <span className="px-2 py-1 border border-gray-200 rounded">{maxValue}</span>
          </div>
          <div className="relative h-1 bg-gray-200 rounded-full mt-2">
            <div 
              className="absolute h-full bg-[#0085FF] rounded-full"
              style={{
                left: `${((minValue - 0) / (10000 - 0)) * 100}%`,
                right: `${100 - ((maxValue - 0) / (10000 - 0)) * 100}%`
              }}
            ></div>
            
            {/* Range Inputs for Slider */}
            <input
              type="range"
              min="0"
              max="10000"
              value={minValue}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), maxValue - 100);
                setMinValue(value);
              }}
              className="absolute w-full h-1 opacity-0 cursor-pointer z-10 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none"
              style={{ pointerEvents: 'none' }}
            />
            <input
              type="range"
              min="0"
              max="10000"
              value={maxValue}
              onChange={(e) => {
                const value = Math.max(Number(e.target.value), minValue + 100);
                setMaxValue(value);
              }}
              className="absolute w-full h-1 opacity-0 cursor-pointer z-10 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none"
              style={{ pointerEvents: 'none' }}
            />

            {/* Visual Thumbs */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0085FF] border-2 border-white rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.25)] pointer-events-none"
              style={{ left: `${((minValue - 0) / (10000 - 0)) * 100}%` }}
            ></div>
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0085FF] border-2 border-white rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.25)] pointer-events-none"
              style={{ left: `${((maxValue - 0) / (10000 - 0)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Range Inputs */}
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(Number(e.target.value))}
            className="w-full h-[38px] px-3 border border-[#D0D5DD] rounded-[6px] text-[14px] font-medium text-[#1A1A1A] focus:outline-none focus:border-[#0085FF]"
          />
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            className="w-full h-[38px] px-3 border border-[#D0D5DD] rounded-[6px] text-[14px] font-medium text-[#1A1A1A] focus:outline-none focus:border-[#0085FF]"
          />
        </div>

        {/* Operator Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOperatorOpen(!isOperatorOpen)}
            className="w-full h-[36px] px-3 flex items-center justify-between border border-[#D0D5DD] rounded-[6px] bg-white text-[14px] font-medium text-[#1A1A1A]"
          >
            <span>{operator}</span>
            <img 
              src={upIcon} 
              alt="Arrow" 
              className={`w-4 h-4 transition-transform ${isOperatorOpen ? '' : 'rotate-180'}`}
            />
          </button>
          
          {isOperatorOpen && (
            <div className="mt-1 bg-white border border-gray-100 rounded-[6px] shadow-lg z-10 py-1 w-full">
              {operators.map((op) => (
                <button
                  key={op}
                  onClick={() => {
                    setOperator(op);
                    setIsOperatorOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-[14px] text-[#4B5563] hover:bg-gray-50 hover:text-[#0085FF]"
                >
                  {op}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
