import type { FC } from 'react';
import lightningIcon from '../../assets/lightning.svg';
import starIcon from '../../assets/star.svg';
import verticalDotsIcon from '../../assets/view-vertical.svg';
import profile1 from '../../assets/profile-1.svg';
import plusColorIcon from '../../assets/pluscolor.svg';

interface ActivityHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ActivityHeader: FC<ActivityHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <>
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
    </>
  );
};
