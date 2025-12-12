import type { FC } from 'react';
import arrowUpRightIcon from '../assets/arrow-right.svg';

interface TrafficAnalysisModalProps {
  value: number;
  total: number;
}

export const TrafficAnalysisModal: FC<TrafficAnalysisModalProps> = ({ value, total }) => {
  // Calculate percentage for the donut chart
  const percentage = Math.min(100, Math.max(0, (value / total) * 100));
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="absolute top-8 left-[450%] -translate-x-1/2 z-50 w-[280px] bg-black rounded-xl border border-gray-800 p-5 shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-white font-medium text-sm">Traffic Analysis</h3>
        <a href="#" className="flex items-center gap-1 text-[#0085FF] text-xs hover:underline">
          View Details
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>

      <div className="flex flex-col items-center justify-center relative mb-4">
        <div className="text-[#0085FF] text-4xl font-bold mb-4">{value}</div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00E0FF] mt-8"></div>
          
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#1a1a1a"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Progress Circle */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#0085FF"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="w-2 h-2 rounded-full bg-[#0085FF] mt-8"></div>
        </div>
      </div>
    </div>
  );
};
