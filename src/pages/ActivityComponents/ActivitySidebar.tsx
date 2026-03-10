import type { FC } from 'react';
import searchIcon from '../../assets/search.svg';
import arrowBorderIcon from '../../assets/arrowborder.svg';
import mobileIcon from '../../assets/mobile.svg';
import comIcon from '../../assets/com.svg';
import lapIcon from '../../assets/lap.svg';

// Mock Data for Activity Sidebar
const activityList = [
  { id: 1, title: 'ProjectFlow Pro', user: 'Sanaya_007', time: '30 Min ago', active: false, icon: mobileIcon, iconBg: 'bg-[#FFEAF8]' },
  { id: 2, title: 'CreativeSync Hub', user: 'Harshad_007', time: '25 Min ago', active: true, icon: comIcon, iconBg: 'bg-[#000000]' },
  { id: 3, title: 'Blueprint Nexus', user: 'Sanaya_007', time: '24 Min ago', active: false, icon: lapIcon, iconBg: 'bg-[#DEEDFF]' },
  { id: 4, title: 'VisionPlan Pro', user: 'Harshad_007', time: '23 Min ago', active: false, icon: mobileIcon, iconBg: 'bg-[#E9E0F5]' },
  { id: 5, title: 'CraftBoard Central', user: 'Harshad_007', time: '15 Min ago', active: false, icon: comIcon, iconBg: 'bg-[#FFF8EA]' },
  { id: 6, title: 'ArtisanLink Connect', user: 'Harshad_007', time: '10 Min ago', active: false, icon: mobileIcon, iconBg: 'bg-[#DEEDFF]' },
  { id: 7, title: 'IdeaForge Studio', user: 'Harshad_007', time: '5 Min ago', active: false, icon: lapIcon, iconBg: 'bg-[#E9E0F5]' },
];

interface ActivitySidebarProps {
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  activeActivityId: number;
  setActiveActivityId: (id: number) => void;
}

export const ActivitySidebar: FC<ActivitySidebarProps> = ({
  timeFilter,
  setTimeFilter,
  activeActivityId,
  setActiveActivityId
}) => {
  return (
    <div className="w-[340px] flex flex-col overflow-y-auto">
      <div className="p-6">
        <h1 className="text-[28px] font-bold mb-5 text-[#7B7B7B]">Activity</h1>
        
        {/* Search */}
        <div className="relative mb-6 -ml-2">
          <img src={searchIcon} alt="Search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
          <input 
            type="text" 
            placeholder="Search Post" 
            className="w-[308px] h-[44px] bg-[#1A1A1A] border border-[#333] rounded-[22px] py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D026AC]"
          />
        </div>

        {/* Time Filters */}
        <div className="flex gap-2 mb-6">
          {['1 Hours (07)', '1 Day (03)', '1 Month (02)'].map((filter) => {
            const isActive = filter === timeFilter;
            return (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-medium transition-colors ${
                  isActive 
                    ? 'bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] text-[#000000] whitespace-nowrap text-[14px] font-bold w-[99px] h-[32px] flex items-center justify-center' 
                    : 'text-[#A9A9A9] hover:bg-[#333] text-[14px] font-regular whitespace-nowrap w-[89px] h-[32px] flex items-center justify-center'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Activity List */}
        <div className="flex flex-col gap-1">
          {activityList.map((item) => {
            const isActive = item.id === activeActivityId;
            return (
              <div 
                key={item.id}
                onClick={() => setActiveActivityId(item.id)}
                className={`flex items-center gap-4 p-3 cursor-pointer transition-colors ${
                  isActive ? 'bg-[#FFFFFF26] rounded-[30px]' : 'hover:bg-[#1A1A1A]/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  <img src={item.icon} alt="Icon" className="w-[16px] h-[16px] opacity-70" />
                </div>
                <div className="flex-1 min-w-0 ">
                  <h3 className="text-[14px] font-italic text-white truncate">{item.title}</h3>
                  <p className="text-[12px] text-[#A9A9A9] truncate">{item.user}  • <span className="font-regular text-[#5A5A5A]">{item.time}</span></p>
                </div>
                {isActive && (
                  <img src={arrowBorderIcon} alt="More" className="w-[20px] h-[20px]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
