import { useState } from 'react';
import userIcon from '../assets/user-icon.svg';
import profile1 from '../assets/profile-1.svg';
import searchIcon from '../assets/search.svg';
import filtersIcon from '../assets/filters.svg';
import timeIcon from '../assets/time.svg';
import threeDotsIcon from '../assets/three-dots.svg';
import mobileIcon from '../assets/mobile.svg';
import comIcon from '../assets/com.svg';
import lapIcon from '../assets/lap.svg';
import plusIcon from '../assets/plus.svg';
import kanbanIcon from '../assets/kanban.svg';
import tableIcon from '../assets/table.svg';
import listIcon from '../assets/list.svg';
import plusColorIcon from '../assets/pluscolor.svg';
import verticalDotsIcon from '../assets/view-vertical.svg';
import starIcon from '../assets/star.svg';
import arrowBorderIcon from '../assets/arrowborder.svg';
import lightningIcon from '../assets/lightning.svg';

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

// Mock Data for Main Content Grid
const posts = Array(12).fill({
  user: 'Harshad_007',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Placeholder image
  avatars: [profile1, profile1, profile1, profile1], // Using placeholder avatars
  images: [profile1, profile1, profile1],
  comments: '5 comments'
});

export const Activity = () => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [viewMode, setViewMode] = useState('Kanban');
  const [timeFilter, setTimeFilter] = useState('1 Hours (07)');
  const [activeActivityId, setActiveActivityId] = useState(2); // Default to CreativeSync Hub

  return (
    <div className="flex h-full bg-black text-white">
      {/* Left Sidebar */}
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

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between mb-1">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-white">CreativeSync Hub</h1>
                <img src={lightningIcon} alt="Star" className="w-[24px] h-[30px]" />
              </div>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-xs text-[#FFFFFF]">Sanaya_007</p>
                <p className="text-xs text-[#FFFFFF]">30 Min ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-[32px] h-[32px] rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center">
                <img src={starIcon} alt="Star" className="w-5 h-5 opacity-70" />
              </div>
              <button className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer bg-[#242424] rounded-full">
                <img src={verticalDotsIcon} alt="Options" className="w-5 h-5 opacity-70" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 flex items-center justify-between mt-6">
            <div className="flex gap-8">
              {['Posts', 'Comments', 'Likes', 'Shared', 'Overview'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium transition-colors relative cursor-pointer ${
                    activeTab === tab ? 'text-[#D026AC]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute top-8 bottom-0 left-0 right-0 h-[2px] bg-[#D026AC]"></div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 border border-[#EBECF2] p-2 rounded-[21px] mb-2 w-[128px] h-[38px]">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-700 overflow-hidden">
                    <img src={profile1} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-black bg-[#242424] flex items-center justify-center text-[10px] font-regular">
                  <span className="bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] bg-clip-text text-transparent">
                    +11
                  </span>
                </div>
              </div>
              <div className="w-px h-[24px] bg-[#EEF1F2] mx-1"></div>
              <button className="w-[38px] h-[38px] flex items-center justify-center">
                <img src={plusColorIcon} alt="Plus" className="w-[38px] h-[38px]" />
              </button>
            </div>
          </div>

        {/* Toolbar */}
        <div className="bg-[#9E9E9E]/18 border-t border-white">
        <div className="px-6 mb-6">
          <div className="py-4 flex items-center justify-between border-b border-[#333]">
            <div className="rounded-[8px] p-1 flex gap-1">
              {['Kanban', 'Table', 'List View'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-1.5 text-xs font-medium flex items-center gap-2 transition-colors ${
                    viewMode === mode 
                      ? 'bg-[linear-gradient(142.65deg,#8000FF_13.26%,#FF0091_67.19%)] text-[#000000] rounded-[43px] w-[98px] h-[32px] flex items-center justify-center' 
                      : 'text-[#FFFFFF] hover:text-[#D026AC]'
                  }`}
                >
                  {/* Icons using imported SVGs */}
                  {mode === 'Kanban' && <img src={kanbanIcon} alt="Kanban" className={`w-[14px] h-[14px] ${viewMode === mode ? '' : ''}`} />}
                  {mode === 'Table' && <img src={tableIcon} alt="Table" className={`w-[14px] h-[14px] ${viewMode === mode ? '' : ''}`} />}
                  {mode === 'List View' && <img src={listIcon} alt="List" className={`w-[14px] h-[14px] ${viewMode === mode ? '' : ''}`} />}
                  {mode}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button className="w-[150px] h-[32px] bg-[linear-gradient(142.65deg,#8000FF_13.26%,#FF0091_67.19%)] hover:bg-[#b02090] text-[#000000] text-[14px] font-italic rounded-full flex items-center justify-center gap-2 whitespace-nowrap">
                <img src={plusIcon} alt="Plus" className="w-[14px] h-[14px]" />
                 New Comments
              </button>
              <button className="w-[77px] h-[32px] px-4 py-2 bg-[#1A1A1A] border border-[#333] hover:bg-[#222] text-white text-[14px] font-regular rounded-full flex items-center justify-center gap-2">
                <img src={filtersIcon} alt="Filter" className="w-3 h-3" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Grid Content */}
        <div className="p-6 pt-0">
          <div className="grid grid-cols-4 gap-4">
            {posts.map((post, index) => (
              <div key={index} className="bg-[#1A1A1A] rounded-[16px] overflow-hidden group">
                {/* Image */}
                <div className="h-[120px] relative">
                  <img src={post.image} alt="Post" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Content */}
                <div className="p-3">
                  <p className="text-[12px] text-[#FFFFFF] mb-4 mt-4">{post.user}</p>
                  
                  <div className="flex items-center justify-between">
                    <img src={timeIcon} alt="Time" className="w-[24px] h-[24px]" />
                    
                    <div className="flex -space-x-1.5">
                      {post.avatars.map((avatar: string, i: number) => (
                        <div key={i} className="w-[24px] h-[24px] rounded-[200px] border border-[#000000] overflow-hidden">
                          <img src={avatar} alt="User" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
