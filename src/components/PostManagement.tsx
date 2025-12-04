import { useState } from 'react';
import type { FC } from 'react';
import postsIcon from '../assets/posts.svg';
import reelsIcon from '../assets/reels.svg';
import tagsIcon from '../assets/tags.svg';
import editIcon from '../assets/edit.svg';

export const PostManagement: FC = () => {
  const [activeTab, setActiveTab] = useState<'POSTS' | 'REELS' | 'TAGGED'>('POSTS');

  const tabs = [
    { id: 'POSTS', label: 'POSTS', icon: postsIcon },
    { id: 'REELS', label: 'REELS', icon: reelsIcon },
    { id: 'TAGGED', label: 'TAGGED', icon: tagsIcon }
  ] as const;

  return (
    <div className="relative">
      {/* Tabs */}
      <div className="flex border-t border-black relative items-center">
        {/* Sliding Indicator */}
        <div 
          className="absolute top-0 w-[351px] h-px bg-white transition-all duration-300 ease-in-out"
          style={{ 
            left: `${tabs.findIndex(tab => tab.id === activeTab) * 351}px`
          }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? 'text-white text-[11px]'
                : 'text-gray-500 hover:text-gray-300 text-[11px]'
            }`}
          >
            <img src={tab.icon} alt={tab.label} className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
        {/* Edit Icon at the end */}
        <img src={editIcon} alt="Edit" className="w-[24px] h-[24px] cursor-pointer ml-auto mr-2" />
      </div>
    </div>
  );
};