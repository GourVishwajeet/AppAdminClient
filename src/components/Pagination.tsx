import type { FC } from 'react';
import skipBackward from '../assets/skip-backward.svg';
import forward from '../assets/forward.svg';
import backward from '../assets/backward.svg';
import skipForward from '../assets/skip-forward.svg';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = '',
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="text-md text-[14px] text-[#F8FAFF]">
        Showing {startItem}-{endItem} from {totalItems}
      </div>
      
      <div className="flex items-center gap-3">
            <button
            onClick={() => onPageChange(1)}
            className="p-px rounded-[10px] bg-linear-to-r from-[#8000FF] to-[#FF0091]"
            >
                <div className="w-[32px] h-[32px] rounded-[10px] bg-[#0C0D0F] flex items-center justify-center">
                    <img src={skipForward} alt="Skip" className="w-[12px] h-[12px]" />
                </div>
            </button>

             <button
            onClick={() => onPageChange(currentPage + 1)}
            className="p-px rounded-[10px] bg-linear-to-r from-[#8000FF] to-[#FF0091]"
            >
                <div className="w-[32px] h-[32px] rounded-[10px] bg-[#0C0D0F] flex items-center justify-center">
                    <img src={forward} alt="Next" className="w-[20px] h-[20px]" />
                </div>
            </button>


        
        {getVisiblePages().map((page, index) => (
          page === '...' ? (
            <span key={index} className="px-3 py-1 text-sm">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page as number)}
              className={`w-[32px] h-[32px] flex items-center justify-center px-3 py-1 text-[14px] rounded transition-colors ${
                currentPage === page
                  ? 'bg-linear-to-br from-[#8000FF] to-[#FF0091] text-[#000000] text-[14px] rounded-[10px]'
                  : 'w-[32px] h-[32px] flex items-center justify-center border border-[#515151] hover:bg-gray-100 rounded-[10px] text-[#F8FAFF] text-[14px]'
              }`}
            >
              {page}
            </button>
          )
        ))}
        
        <button
            onClick={() => onPageChange(1)}
            className="p-px rounded-[10px] bg-linear-to-r from-[#8000FF] to-[#FF0091]"
            >
                <div className="w-[32px] h-[32px] rounded-[10px] bg-[#0C0D0F] flex items-center justify-center">
                    <img src={backward} alt="Skip" className="w-[20px] h-[20px]" />
                </div>
            </button>

        <button
            onClick={() => onPageChange(currentPage - 1)}
            className="p-px rounded-[10px] bg-linear-to-r from-[#8000FF] to-[#FF0091]"
        >
                <div className="w-[32px] h-[32px] rounded-[10px] bg-[#0C0D0F] flex items-center justify-center">
                    <img src={skipBackward} alt="Previous" className="w-[12px] h-[12px]" />
                </div>
        </button>
      </div>
    </div>
  );
};
