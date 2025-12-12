import type { FC } from 'react';
import { useEffect } from 'react';
import { type StoryManagementData } from '../constants/mockData';
import storyImage from '../assets/story.svg';
import threeDotsIcon from '../assets/three-dots.svg';
import usersIcon from '../assets/users.svg';
import timeIcon from '../assets/time.svg';
import avatarIcon from '../assets/avatar.svg';
import rightIcon from '../assets/right.svg';
import pauseIcon from '../assets/pause.svg';
import viewVerticalIcon from '../assets/view-vertical.svg';
import closeIcon from '../assets/close.svg';

interface StoryViewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: StoryManagementData | null;
}

export const StoryViewPanel: FC<StoryViewPanelProps> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel Content */}
      <div className="relative bg-black w-[450px] h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-[#1F2937]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1F2937]">
          <h2 className="text-[27px] font-semibold text-white">View Story</h2>
          <button 
            onClick={onClose}
            className="text-[#FF008A] hover:text-[#ff33a1] transition-colors"
          >
            <img src={closeIcon} alt="Close" className="w-[42px] h-[42px]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-2 text-white no-scrollbar">
          
          {/* Story Content Section */}
          <div className="mb-3">
            <h3 className="text-[16px] font-semibold text-white mb-3">Story Content</h3>
            <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a]">
              <img 
                src={storyImage} 
                alt="Story Content" 
                className="w-[525px] h-auto object-cover"
              />
              <button className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/20 transition-colors">
                <img src={threeDotsIcon} alt="Options" className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Story Music Section */}
          <div className="mb-2">
            <h3 className="text-[14px] font-semibold text-white mb-2">Story Music</h3>
            <div className="flex items-center justify-between bg-transparent">
              <div>
                <div className="text-[#090909] text-sm font-medium">Different World ...</div>
                <div className="text-[#FFFFFF] text-[12px] mt-1">Alan Walker, K-391 & Sofia Carson</div>
              </div>
              <button 
                className="w-[40px] h-[40px] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity bg-[linear-gradient(213.5deg,#8673FD_11.35%,#5C42FF_86.53%)]"
              >
                <img src={pauseIcon} alt="Pause" className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>

          {/* Story Viewers Section */}
          <div className="mb-4">
            <h3 className="text-[14px] font-medium text-white mb-3">Story Viewers</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                   <img src={usersIcon} alt="Viewers" className="h-8 w-auto" />
                </div>
                <span className="text-[14px] font-semibold text-white ml-2">+1245 More..</span>
              </div>
              <div className="flex items-center gap-[8px] text-[#F8FAFF] text-[16px] font-semibold">
                <img src={timeIcon} alt="Time" className="w-4 h-4" />
                <span>3 Hours Ago</span>
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <div className="pt-3">
            <div className="flex items-center gap-[12px] mb-2">
              <img 
                src={avatarIcon} 
                alt="Maude Hall" 
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="flex items-center gap-4">
                <span className="text-white font-medium text-[22px]">Maude Hall</span>
                <span className="text-[#FFFFFF] text-[20px]">14 min</span>
              </div>
            </div>
            
            <p className="text-[#D1D5DB] font-medium text-[16px] leading-relaxed mb-4 overflow-hidden">
              That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback.That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback.
            </p>
            
            <div className="flex items-center gap-[15px] text-[16px] text-[#FFFFFF]">
              <span className="cursor-pointer hover:text-white transition-colors font-medium text-[16px]">2 Likes</span>
              <button className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                <img src={rightIcon} alt="Reply" className="w-6 h-6" />
                <span className='font-medium text-[16px]'>Reply</span>
              </button>
              <div className="flex-1 flex justify-end">
                  <img src={viewVerticalIcon} alt="More" className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
