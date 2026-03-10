import type { FC } from 'react';

export const PostAnalysisPopup: FC = () => {
  // Data from the image
  const data = [
    { label: 'Views', value: 39, color: '#06B6D4', radius: 124, trackPercent: 0.8, width: 80, marginLeft: 60, marginTop: -4 }, // Cyan
    { label: 'Likes', value: 38, color: '#EC4899', radius: 100, trackPercent: 0.7, width: 80, marginLeft: 60, marginTop: 8 }, // Pink
    { label: 'Dislikes', value: 27, color: '#EAB308', radius: 76, trackPercent: 0.6, width: 90, marginLeft: 50, marginTop: 9 }, // Yellow
    { label: 'Comments', value: 22, color: '#8B5CF6', radius: 52, trackPercent: 0.5, width: 100, marginLeft: 40, marginTop: 9 }, // Purple
  ];

  const center = 140;
  const strokeWidth = 14;
  const size = 280;

  return (
    <div className="absolute top-full right-0 mt-2 z-50 w-[340px] bg-black border border-[#1F2937] rounded-xl shadow-2xl p-6 cursor-default" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-[16px] font-medium">Post Analysis</h3>
        <button className="text-[#A855F7] text-[12px] flex items-center gap-1 hover:text-[#9333EA] transition-colors">
          View Details
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-center gap-6 relative top-[10px]">
        {/* Legend */}
        <div className="flex flex-col gap-px pt-[14px] flex-1 absolute left-0 top-0 w-full h-full z-10 pointer-events-none">
          {data.map((item) => (
            <div key={item.label} className="flex items-center justify-between h-[14px]" style={{ marginLeft: `${item.marginLeft}px`, marginTop: `${item.marginTop || 0}px`, width: `${item.width}px` }}>
              <span className="text-[12px] font-medium" style={{ color: item.color }}>{item.label}</span>
              <span className="text-[12px] font-bold" style={{ color: item.color }}>{item.value}%</span>
            </div>
          ))}
        </div>

        {/* Semi-Circle Chart */}
        <div className="relative shrink-0 h-[280px] w-[280px] flex items-center justify-center">
          <svg 
            width={size} 
            height={size} 
            viewBox={`0 0 ${size} ${size}`} 
            style={{ transform: 'rotate(270deg)', transformOrigin: 'center' }}
          >
            {data.map((item) => {
              const radius = item.radius;
              const circumference = 2 * Math.PI * radius;
              // Max arc length based on individual trackPercent
              const maxArcLength = circumference * item.trackPercent;
              // Current arc length proportional to value relative to max value (39)
              const arcLength = maxArcLength * (item.value / 39);
              
              const strokeDasharray = `${arcLength} ${circumference}`;
              const trackDasharray = `${maxArcLength} ${circumference}`;
              
              return (
                <g key={item.label}>
                  {/* Background Track */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="#374151"
                    strokeWidth={strokeWidth}
                    strokeOpacity={0.2}
                    strokeDasharray={trackDasharray}
                    strokeLinecap="butt"
                  />
                  {/* Progress Arc */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeLinecap="butt"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
