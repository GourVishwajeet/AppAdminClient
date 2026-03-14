import type { FC } from 'react';
import emailIcon from '../assets/email.svg';
import notificationsIcon from '../assets/notifications.svg';
import languageIcon from '../assets/languages.svg';
import downIcon from '../assets/down.svg';
import userIcon from '../assets/user.svg';
import arrowDown from '../assets/arrow-down.svg';
import { useState } from 'react';
import { NotificationPopup } from './ui/NotificationPopup';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Post Reported',
    message: 'A post by @Sanaya_007 has been reported for community guidelines.',
    time: '2 min ago',
    type: 'warning' as const,
    read: false
  },
  {
    id: '2',
    title: 'Post Analysis Ready',
    message: 'The performance report for your latest campaign is now available.',
    time: '45 min ago',
    type: 'success' as const,
    read: false
  },
  {
    id: '3',
    title: 'System Update',
    message: 'Server maintenance completed successfully.',
    time: '2 hours ago',
    type: 'info' as const,
    read: true
  }
];

export const Header: FC = () => {
  const handleEmailClick = () => {
    // Email click handler
  };

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleNotificationsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleLanguageClick = () => {
    // Language click handler
  };

  const handleProfileClick = () => {
    // Profile click handler
  };

  return (
    <header className="w-full h-[90px] shrink-0 bg-black text-[#dcdcdc] flex items-center justify-between px-4 border-b border-[#1f1f1f]">
      <div className="text-sm font-medium text-[20px] pl-6" onClick={() => {}}>
        <span className="bg-linear-to-r from-[#8000FF] to-[#FF0091] bg-clip-text text-transparent">X app Admin</span>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <div className="flex items-center gap-5">
          <button type="button" onClick={handleEmailClick} className="relative w-6 h-6 flex items-center justify-center">
            <img src={emailIcon} alt="Email" className="w-4 h-4 object-contain" />
            <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-linear-to-br from-[#8000FF] to-[#FF0091] text-[9px] leading-[14px] text-white text-center">
              3
            </span>
          </button>
          <div className="relative">
            <button 
              type="button" 
              onClick={handleNotificationsClick} 
              className={`relative w-6 h-6 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${isNotificationsOpen ? 'text-white' : 'text-gray-400'}`}
            >
              <img src={notificationsIcon} alt="Notifications" className="w-4 h-4 object-contain" />
              <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-0.5 rounded-full bg-linear-to-br from-[#8000FF] to-[#FF0091] text-[9px] leading-[14px] text-white text-center shadow-lg shadow-purple-500/20">
                5
              </span>
            </button>
            <NotificationPopup 
              isOpen={isNotificationsOpen} 
              onClose={() => setIsNotificationsOpen(false)} 
              notifications={MOCK_NOTIFICATIONS} 
            />
          </div>
        </div>
        <div onClick={handleLanguageClick} className="flex items-center gap-2 pl-2 cursor-pointer">
            <img src={languageIcon} alt="Language" className="w-4 h-4 object-contain" />
          <span className="text-[11px] text-[#dcdcdc]">Eng (US)</span>
          <img src={downIcon} alt="Down" className="w-6 h-6 object-contain" />
        </div>
        <div className="w-px h-[40px] bg-[#F0F1F3]" />
        <div onClick={handleProfileClick} className="flex items-center gap-3 cursor-pointer">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <img src={userIcon} alt="User" className="w-6 h-6 object-contain" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-linear-to-br from-[#8000FF] to-[#FF0091]" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[14px] font-medium text-[#f5f5f5]">Jenil Bhayani</span>
            <span className="text-[12px] font-medium text-[#F1F3FF]">Manager</span>
          </div>
          <img src={arrowDown} alt="Down" className="w-6 h-6 object-contain" />
        </div>
      </div>
    </header>
  );
};
